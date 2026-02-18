import { writeFile } from "fs/promises";
import RSS from "rss";

const SITE_URL = "https://aadittambe.com";

export default async function generateRssFeed(allPosts = []) {
  const feed = new RSS({
    title: "Aadit Tambe's blog",
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/rss.xml`,
    image_url: `${SITE_URL}/logo592.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  });

  for (const post of allPosts) {
    feed.item({
      title: post.title,
      description: post.subhead || "",
      url: `${SITE_URL}/blog/${post.slug}`,
      date: post.date,
    });
  }

  const xml = feed.xml({ indent: true });

  await writeFile("./public/rss.xml", xml, "utf8");
}
