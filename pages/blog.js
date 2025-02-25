import Head from "next/head";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";
import { compareDesc } from "date-fns";
import generateRssFeed from "../utils/rss";
import fetchBlogData from "../utils/fetchBlogData";
import Layout from "../components/layout";
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
    <Layout>
      <div className="blog container">
        <Head>
          <title>Aadit&apos;s blog</title>
        </Head>
        <h1>✍️ Blog</h1>
        <p style={{ paddingBottom: "24px" }}>
          You found my blog! I created this page to practice building a blog
          with Next.js, and now end up writing here infrequently. You can
          subscribe to my RSS feed{" "}
          <a href="https://aadittambe.com/rss.xml">here</a>.
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
    </Layout>
  );
};

export default BlogPage;
