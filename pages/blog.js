import Head from "next/head";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";
import { compareDesc } from "date-fns";
import generateRssFeed from "../utils/rss";
import fetchBlogData from "../utils/fetchBlogData";
const longAP = require("ap-style-date").longAP;
const config = require("../blogConfig");

export async function getStaticProps() {
  fetchBlogData(config);
  try {
    const allPostsData = await getSortedPostsData(); // Await the asynchronous function
    generateRssFeed(allPostsData);
    return {
      props: {
        allPostsData,
      },
    };
  } catch (error) {
    console.error("Error fetching posts data:", error);
    return {
      props: {
        allPostsData: [],
      },
    };
  }
}

const BlogPage = ({ allPostsData }) => {
  const sortedPosts = allPostsData.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="blog">
      <Head>
        <title>Aadit Tambe&apos;s blog</title>
      </Head>
      <h1>✍️ Blog</h1>
      <p style={{ paddingBottom: "24px" }}>
        Thoughts, ideas, code hacks, and projects I find interesting.
      </p>
      <div className="posts">
        <table>
          <tbody>
            {sortedPosts.map((p, i) => (
              <tr key={i}>
                <td className="post-title">
                  <p>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </p>
                </td>
                <td className="post-date">
                  <p>
                    <Link href={`/blog/${p.slug}`}>{longAP(p.date)}</Link>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogPage;
