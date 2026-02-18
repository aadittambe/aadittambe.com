import Head from "next/head";
import Link from "next/link";
import { compareDesc } from "date-fns";
import apStyleDate from "ap-style-date";

import { getSortedPostsData } from "../lib/posts";
import generateRssFeed from "../utils/rss";
import fetchBlogData from "../utils/fetchBlogData";
import Layout from "../components/layout";
import config from "../blogConfig.json";

const { longAP } = apStyleDate;

export async function getStaticProps() {
  try {
    await fetchBlogData(config);

    const allPostsData = getSortedPostsData();
    const sortedPosts = [...allPostsData].sort((a, b) =>
      compareDesc(new Date(a.date), new Date(b.date)),
    );

    await generateRssFeed(sortedPosts);

    return {
      props: {
        allPostsData: sortedPosts,
      },
    };
  } catch (error) {
    console.error("Error building blog index:", error);
    return {
      props: {
        allPostsData: [],
      },
    };
  }
}

export default function BlogPage({ allPostsData = [] }) {
  return (
    <Layout>
      <div className="blog container">
        <Head>
          <title>Aadit&apos;s blog</title>
        </Head>

        <h1>Blog.</h1>
        <p style={{ paddingBottom: "24px" }}>
          You found my blog! I created this page to practice building a blog
          with Next.js, and now end up writing here infrequently. You can
          subscribe to my RSS feed{" "}
          <a href="https://aadittambe.com/rss.xml">here</a>.
        </p>

        <div className="posts">
          <table>
            <tbody>
              {allPostsData.map((p) => (
                <tr key={p.slug}>
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
}
