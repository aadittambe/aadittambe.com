const fs = require("fs");
import RSS from "rss";

export default async function generateRssFeed(allPosts) {
  const site_url = "https://aadittambe.com";

  const feedOptions = {
    title: "Aadit Tambe's blog",
    // description: "ADD DESCRIPTION",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo592.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  // Add each individual post to the feed.
  allPosts.map((post) => {
    feed.item({
      title: post.title,
      description: post.subhead,
      url: `${site_url}/posts/${post.slug}`,
      date: post.date,
    });
  });

  // Write the RSS feed to a file as XML.
  fs.writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}
