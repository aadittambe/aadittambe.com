import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";

export default function Post({ postData }) {
  return (
    <Layout blog>
      <div>
        <Head>
          <title>{postData.title}.</title>
        </Head>

        <main>
          <h1>{postData.title}</h1>
          <p>{postData.subhead}.</p>

          <article>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </article>
        </main>
      </div>
    </Layout>
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
