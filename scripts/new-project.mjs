import { writeFile } from "fs/promises";
import { existsSync } from "fs";
import path from "node:path";
import { input, confirm } from "@inquirer/prompts";

const CWD = process.cwd();
const PROJECTS_DIR = path.join(CWD, "projects");

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const todayMDY = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}/${dd}/${d.getFullYear()}`;
};

const buildFrontmatter = (meta) => {
  // Only title, slug, org and date are always written; the rest are optional
  // and omitted when left blank so the file stays clean.
  const fields = [
    "title",
    "org",
    "date",
    "slug",
    "img",
    "imgAlt",
    "url",
    "description",
  ];
  const lines = fields
    .filter((key) => meta[key] !== undefined && String(meta[key]).trim() !== "")
    .map((key) => `${key}: ${meta[key]}`);
  return ["---", ...lines, "---", "", ""].join("\n");
};

async function main() {
  console.log("\n📝 New project\n");

  const title = await input({ message: "Title:", required: true });

  const slug = slugify(
    await input({
      message: "Slug:",
      default: slugify(title),
      required: true,
      validate: (v) =>
        slugify(v).length > 0 || "Please enter a slug with letters or numbers.",
    }),
  );

  const filePath = path.join(PROJECTS_DIR, `${slug}.md`);
  if (existsSync(filePath)) {
    const overwrite = await confirm({
      message: `projects/${slug}.md already exists. Overwrite?`,
      default: false,
    });
    if (!overwrite) {
      console.log("Aborted.");
      return;
    }
  }

  const meta = {
    title,
    org: await input({ message: "Org:", default: "The Washington Post" }),
    date: await input({ message: "Date (MM/DD/YYYY):", default: todayMDY() }),
    slug,
    img: await input({
      message: "Thumbnail (full URL, or a filename in public/images/projects/):",
    }),
    imgAlt: await input({ message: "Image alt text:" }),
    url: await input({ message: "Live project URL:" }),
    description: await input({ message: "Description (for SEO/previews):" }),
  };

  // Write the local .md with frontmatter (+ empty body for now).
  await writeFile(filePath, buildFrontmatter(meta), "utf8");

  console.log(`\n✓ Wrote projects/${slug}.md`);
  console.log(`\nEdit projects/${slug}.md to write the project.`);
  console.log(`\n🎉 Done. Preview at /projects/${slug}\n`);
}

main().catch((err) => {
  // A clean Ctrl-C should exit quietly rather than dumping a stack trace.
  if (err && err.name === "ExitPromptError") {
    console.log("\nCancelled.");
    process.exit(0);
  }
  console.error(err);
  process.exit(1);
});
