import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <Head>
        <title>Aadit Tambe — Page not found</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="not-found">
        <h1>Page not found.</h1>
        <p>Sorry, the page you&rsquo;re looking for doesn&rsquo;t exist.</p>
        <p>
          You could head back to the <Link href="/">home page</Link>, browse my{" "}
          <Link href="/projects">projects</Link>, or{" "}
          <Link href="/contact">get in touch</Link> if you think something is
          broken.
        </p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
