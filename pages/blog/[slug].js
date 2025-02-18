import { compareDesc } from "date-fns";
import {
  getAllPostSlugs,
  getPostDataBySlug,
  getSortedPostsData,
} from "../../lib/posts";
import Head from "next/head";
import Link from "next/link";
const longAP = require("ap-style-date").longAP;

export default function Post({ postData, prevPost, nextPost }) {
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
        <nav>
          <div className="actions">
            {prevPost && (
              <>
                <p className="label">← Previous</p>
                <p>
                  <Link href={`/blog/${prevPost.slug}`}>{prevPost.title}</Link>
                </p>
              </>
            )}
          </div>
          <div className="actions next">
            {nextPost && (
              <>
                <p className="label">Next →</p>
                <p>
                  <Link href={`/blog/${nextPost.slug}`}>{nextPost.title}</Link>
                </p>
              </>
            )}
          </div>
        </nav>
      </main>
    </div>
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
  const data = getSortedPostsData();
  const allPostsData = data.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  const postIndex = allPostsData.findIndex((post) => post.slug === params.slug);
  const postData = await getPostDataBySlug(params.slug);

  const prevPost = postIndex > 0 ? allPostsData[postIndex - 1] : null;
  const nextPost =
    postIndex < allPostsData.length - 1 ? allPostsData[postIndex + 1] : null;

  return {
    props: {
      postData,
      prevPost,
      nextPost,
    },
  };
}
