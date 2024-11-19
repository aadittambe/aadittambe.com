import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

const BlogPage = (props) => {
  const { allPostsData } = props;

  console.log(allPostsData);

  return (
    <div>
      <Head>
        <title>bloggg</title>
      </Head>

      <main>
        {allPostsData.map((p) => (
          <div key={p.id}>
            <Link href={`/blog/${p.id}`}>{p.id}</Link>
          </div>
        ))}
      </main>
    </div>
  );
};

export default BlogPage;
