import { getAllPostSlugs, getPostDataBySlug } from "../../lib/posts";
import Head from "next/head";
const longAP = require("ap-style-date").longAP;

export default function Post({ postData }) {
  return (
    <div className="post">
      <Head>
        <title>{postData.title}</title>
      </Head>

      <main>
        <article>
          <h1>{postData.title}</h1>
          <p>{postData.subhead}</p>
          <p>{longAP(postData.date)}</p>
          <div className="divider" />
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </main>
    </div>
  );
}

// Return a list of possible value for id
export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

// Fetch necessary data for the blog post using params.id
export async function getStaticProps({ params }) {
  const postData = await getPostDataBySlug(params.slug);
  return {
    props: {
      postData,
    },
  };
}
