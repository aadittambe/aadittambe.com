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
  // Tile-only projects imported from content.json have no date — treat those
  // as oldest so they settle after every dated write-up, in file order.
  const dateValue = (d) => {
    const t = d.date ? new Date(d.date).getTime() : NaN;
    return Number.isNaN(t) ? -Infinity : t;
  };
  return allProjectsData.sort((a, b) => dateValue(b) - dateValue(a));
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
