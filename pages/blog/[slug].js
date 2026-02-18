import { compareDesc } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import {
  getAllPostSlugs,
  getPostDataBySlug,
  getSortedPostsData,
} from "../../lib/posts";
import apStyleDate from "ap-style-date";
const { longAP } = apStyleDate;

export default function Post({ postData, prevPost, nextPost }) {
  return (
    <Layout>
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
          <nav>
            <div className="actions">
              {prevPost && (
                <>
                  <p className="label">← Previous</p>
                  <p>
                    <Link href={`/blog/${prevPost.slug}`}>
                      {prevPost.title}
                    </Link>
                  </p>
                </>
              )}
            </div>
            <div className="actions next">
              {nextPost && (
                <>
                  <p className="label">Next →</p>
                  <p>
                    <Link href={`/blog/${nextPost.slug}`}>
                      {nextPost.title}
                    </Link>
                  </p>
                </>
              )}
            </div>
          </nav>
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const sortedPosts = [...getSortedPostsData()].sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  const postIndex = sortedPosts.findIndex((post) => post.slug === params.slug);

  const postData = await getPostDataBySlug(params.slug);

  const prevPost = postIndex > 0 ? sortedPosts[postIndex - 1] : null;
  const nextPost =
    postIndex >= 0 && postIndex < sortedPosts.length - 1
      ? sortedPosts[postIndex + 1]
      : null;

  return {
    props: {
      postData,
      prevPost,
      nextPost,
    },
  };
}
