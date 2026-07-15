import http from "node:http";
import { readFile, writeFile, unlink, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

// Local-only tool: manages projects/*.md metadata (a table with drag-reorder
// and full CRUD). Never imported by pages/ or touched by `next build` — it
// must never ship in the static export. Binds to loopback only.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CWD = path.resolve(__dirname, "..", "..");
const PROJECTS_DIR = path.join(CWD, "projects");
const PUBLIC_DIR = path.join(CWD, "public");
const HOST = "localhost";
const START_PORT = 4321;

const IMAGE_CONTENT_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const EDITABLE_FIELDS = ["title", "org", "date", "img", "imgAlt", "url", "description"];
const FIELD_ORDER = ["title", "org", "date", "slug", "order", "img", "imgAlt", "url", "description"];

const slugify = (str) =>
  String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Only ever touch a real, existing .md file inside PROJECTS_DIR — blocks
// path traversal via a crafted filename in the URL.
async function resolveProjectFile(filename) {
  const safeName = path.basename(String(filename));
  if (!safeName.endsWith(".md")) return null;
  const filePath = path.join(PROJECTS_DIR, safeName);
  try {
    await readFile(filePath, "utf8");
    return filePath;
  } catch {
    return null;
  }
}

function orderedFrontmatter(data) {
  const ordered = {};
  for (const key of FIELD_ORDER) {
    if (data[key] !== undefined && data[key] !== "") ordered[key] = data[key];
  }
  for (const [key, value] of Object.entries(data)) {
    if (!(key in ordered) && value !== undefined && value !== "") ordered[key] = value;
  }
  return ordered;
}

async function listProjects() {
  const files = (await readdir(PROJECTS_DIR)).filter((f) => f.endsWith(".md"));
  const projects = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(PROJECTS_DIR, file), "utf8");
      const parsed = matter(raw);
      const hasContent = parsed.content.trim().length > 0;
      return {
        file,
        ...parsed.data,
        type: parsed.data.description ? "card" : "tile",
        hasContent,
      };
    }),
  );
  const orderOf = (p) => (Number.isFinite(Number(p.order)) ? Number(p.order) : Infinity);
  projects.sort((a, b) => orderOf(a) - orderOf(b));
  return projects;
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function sendJson(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

async function handleGetProjects(req, res) {
  sendJson(res, 200, await listProjects());
}

async function handleUpdateProject(req, res, filename) {
  const filePath = await resolveProjectFile(filename);
  if (!filePath) return sendJson(res, 404, { error: "Project not found" });

  const updates = await readJsonBody(req);
  const raw = await readFile(filePath, "utf8");
  const parsed = matter(raw);

  const data = { ...parsed.data };
  for (const key of EDITABLE_FIELDS) {
    if (key in updates) {
      const value = updates[key];
      if (value === undefined || value === null || value === "") delete data[key];
      else data[key] = value;
    }
  }

  const out = matter.stringify(parsed.content || "\n", orderedFrontmatter(data));
  await writeFile(filePath, out, "utf8");
  sendJson(res, 200, { ok: true });
}

async function handleCreateProject(req, res) {
  const body = await readJsonBody(req);
  const title = String(body.title || "").trim();
  if (!title) return sendJson(res, 400, { error: "Title is required" });

  const slug = slugify(title);
  if (!slug) return sendJson(res, 400, { error: "Title must contain letters or numbers" });

  const filePath = path.join(PROJECTS_DIR, `${slug}.md`);
  try {
    await readFile(filePath, "utf8");
    return sendJson(res, 409, { error: `projects/${slug}.md already exists` });
  } catch {
    // doesn't exist yet — good
  }

  const projects = await listProjects();
  const maxOrder = projects.reduce((max, p) => {
    const n = Number(p.order);
    return Number.isFinite(n) && n > max ? n : max;
  }, 0);

  const data = orderedFrontmatter({
    title,
    org: body.org || "",
    slug,
    order: maxOrder + 1,
  });
  const out = matter.stringify("\n", data);
  await writeFile(filePath, out, "utf8");
  sendJson(res, 201, { file: `${slug}.md` });
}

async function handleDeleteProject(req, res, filename) {
  const filePath = await resolveProjectFile(filename);
  if (!filePath) return sendJson(res, 404, { error: "Project not found" });
  await unlink(filePath);
  sendJson(res, 200, { ok: true });
}

async function handleReorder(req, res) {
  const body = await readJsonBody(req);
  const files = Array.isArray(body.files) ? body.files : null;
  if (!files) return sendJson(res, 400, { error: "Expected { files: string[] }" });

  for (let i = 0; i < files.length; i++) {
    const filePath = await resolveProjectFile(files[i]);
    if (!filePath) continue;
    const raw = await readFile(filePath, "utf8");
    const parsed = matter(raw);
    const data = orderedFrontmatter({ ...parsed.data, order: i + 1 });
    const out = matter.stringify(parsed.content || "\n", data);
    await writeFile(filePath, out, "utf8");
  }
  sendJson(res, 200, { ok: true });
}

async function handleIndex(req, res) {
  const html = await readFile(path.join(__dirname, "index.html"), "utf8");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

// Thumbnails stored as bare filenames (e.g. "formats.png") live in
// public/images/projects/ and are served by Next.js at that same path in
// dev/prod — mirror that here so local thumbnails preview correctly.
async function handleStaticImage(req, res, pathname) {
  const ext = path.extname(pathname).toLowerCase();
  const contentType = IMAGE_CONTENT_TYPES[ext];
  if (!contentType) return sendJson(res, 404, { error: "Not found" });

  const relative = decodeURIComponent(pathname).replace(/^\/+/, "");
  const filePath = path.join(PUBLIC_DIR, relative);
  if (!filePath.startsWith(PUBLIC_DIR)) return sendJson(res, 403, { error: "Forbidden" });

  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch {
    sendJson(res, 404, { error: "Not found" });
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  try {
    if (req.method === "GET" && url.pathname === "/") return await handleIndex(req, res);
    if (req.method === "GET" && url.pathname.startsWith("/images/")) {
      return await handleStaticImage(req, res, url.pathname);
    }
    if (req.method === "GET" && url.pathname === "/api/projects") return await handleGetProjects(req, res);
    if (req.method === "POST" && url.pathname === "/api/projects") return await handleCreateProject(req, res);
    if (req.method === "POST" && url.pathname === "/api/reorder") return await handleReorder(req, res);

    const projectMatch = url.pathname.match(/^\/api\/projects\/([^/]+)$/);
    if (projectMatch) {
      const filename = decodeURIComponent(projectMatch[1]);
      if (req.method === "PUT") return await handleUpdateProject(req, res, filename);
      if (req.method === "DELETE") return await handleDeleteProject(req, res, filename);
    }

    sendJson(res, 404, { error: "Not found" });
  } catch (err) {
    console.error(err);
    sendJson(res, 500, { error: err.message });
  }
});

function listen(port, attemptsLeft) {
  server.once("error", (err) => {
    if (err.code === "EADDRINUSE" && attemptsLeft > 0) {
      listen(port + 1, attemptsLeft - 1);
    } else {
      console.error(err);
      process.exit(1);
    }
  });
  server.listen(port, HOST, () => {
    console.log(`\n✓ Admin running at http://${HOST}:${port} (local only — never deployed)\n`);
  });
}

listen(START_PORT, 10);
