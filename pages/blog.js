import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";
import { compareDesc } from "date-fns";
const longAP = require("ap-style-date").longAP;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}

const BlogPage = (props) => {
  const { allPostsData } = props;

  const sortedPosts = allPostsData.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="blog">
      <Head>
        <title>bloggg</title>
      </Head>
      <h1>✍️ Blog</h1>

      <div id="posts">
        <table>
          <tbody>
            {sortedPosts.map((p, i) => (
              <tr key={i}>
                <td class="post-title">
                  <p>
                    <Link href={`/blog/${p.id}`}>{p.title}</Link>
                  </p>
                </td>
                <td class="post-date">
                  <p>
                    <Link href={`/blog/${p.id}`}>{longAP(p.date)}</Link>
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div>
        {allPostsData.map((p) => (
          <div key={p.id}>
            <Link href={`/blog/${p.id}`}>{p.id}</Link>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default BlogPage;
// <div key={p.id}>
//   <Link href={`/blog/${p.id}`}>{p.id}</Link>
// </div>
