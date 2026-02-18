import { writeFile } from "fs/promises";
import path from "node:path";

const fetchMarkdown = async ({ id, slug }) => {
  const url = `https://docs.google.com/document/d/${id}/export?format=md`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch "${slug}" (${response.status})`);
  }

  const text = await response.text();
  return text.replace(/\\/g, "");
};

const fetchBlogData = async (config, outputDir = "./blog") => {
  const results = await Promise.allSettled(
    config.map(async (item) => {
      const markdown = await fetchMarkdown(item);
      const filePath = path.join(outputDir, `${item.slug}.md`);

      await writeFile(filePath, markdown, "utf8");
      return item.slug;
    }),
  );

  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length) {
    console.error(
      "Some blog posts failed to fetch:\n",
      failures.map((f) => f.reason.message),
    );
  }
};

export default fetchBlogData;
