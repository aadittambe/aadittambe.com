import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
const longAP = require("ap-style-date").longAP;

export default function Post({ postData }) {
  return (
    <div className="post">
      <Head>
        <title>Aadit Tambe&apos;s blog</title>
      </Head>

      <main>
        <h1>{postData.title}</h1>
        <p>{postData.subhead}</p>
        <p>{longAP(postData.date)}</p>
        <div className="divider" />
        <article>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </main>
    </div>
  );
}

// Return a list of possible value for id
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

// Fetch necessary data for the blog post using params.id
export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
