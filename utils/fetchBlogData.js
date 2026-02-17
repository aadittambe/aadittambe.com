import { writeFile } from "fs/promises";

const fetchBlogData = async (config) => {
  await Promise.all(
    config.map(async (item) => {
      const url = `https://docs.google.com/document/d/${item.id}/export?format=md`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${item.slug}`);
      }

      const body = await response.text();
      const cleaned = body.replace(/\\/g, "");

      await writeFile(`./blog/${item.slug}.md`, cleaned);
    }),
  );
};

export default fetchBlogData;
