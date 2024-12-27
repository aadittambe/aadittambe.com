import Head from "next/head";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";
import { compareDesc } from "date-fns";
const longAP = require("ap-style-date").longAP;

export async function getStaticProps() {
  try {
    const allPostsData = await getSortedPostsData(); // Await the asynchronous function

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

      <div id="posts">
        <table>
          <tbody>
            {sortedPosts.map((p, i) => (
              <tr key={i}>
                <td className="post-title">
                  <p>
                    <Link href={`/blog/${p.id}`}>{p.title}</Link>
                  </p>
                </td>
                <td className="post-date">
                  <p>
                    <Link href={`/blog/${p.id}`}>{longAP(p.date)}</Link>
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
