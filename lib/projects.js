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
  return allProjectsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllProjectSlugs() {
  return readProjectFiles().map((fileName) => {
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      params: {
        slug: matterResult.data.slug,
      },
    };
  });
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
