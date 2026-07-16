import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkFigures from "./remarkFigures";

const projectsDirectory = path.join(process.cwd(), "projects");

function readProjectFiles() {
  if (!fs.existsSync(projectsDirectory)) return [];
  return fs.readdirSync(projectsDirectory).filter((f) => f.endsWith(".md"));
}

export function getSortedProjectsData() {
  const allProjectsData = readProjectFiles().map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      slug: matterResult.data.slug,
      hasContent: matterResult.content.trim().length > 0,
      ...matterResult.data,
    };
  });
  // `order` is the canonical, manually-managed sort key (see scripts/admin).
  // Missing/non-numeric values sort last instead of crashing the build.
  const orderOf = (p) =>
    Number.isFinite(Number(p.order)) ? Number(p.order) : Infinity;
  return allProjectsData.sort((a, b) => orderOf(a) - orderOf(b));
}

export function getAllProjectSlugs() {
  // Only projects with a written body get their own page — tile-only
  // projects (no description) link straight out to the live project.
  return readProjectFiles()
    .map((fileName) => {
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      return matter(fileContents);
    })
    .filter((matterResult) => matterResult.content.trim().length > 0)
    .map((matterResult) => ({
      params: {
        slug: matterResult.data.slug,
      },
    }));
}

export async function getProjectDataBySlug(slug) {
  const fileNames = readProjectFiles();
  const fileName = fileNames.find((fileName) => {
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return matterResult.data.slug === slug;
  });

  const id = fileName.replace(/\.md$/, "");
  const fullPath = path.join(projectsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(remarkFigures)
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    slug: matterResult.data.slug,
    contentHtml,
    ...matterResult.data,
  };
}
