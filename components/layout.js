import Head from "next/head";

import { useRouter } from "next/router";

export default function Layout({ children, home, blog }) {
  return (
    <div>
      <Head>
        <title>Aadit Tambe — a journalist and developer</title>
        <meta
          name="description"
          content="Aadit Tambe is a journalist and developer who tells data-driven stories visually — with code."
        />
        <link rel="icon" href="/logo592.png" />
        <link rel="shortcut icon" href="/static/logo592.png" />
        <link rel="apple-touch-icon" href="/static/logo592.png" />
        <link rel="me" href="https://vis.social/@aadittambe" />
      </Head>
      <main className="container">
        {children}

        {!home && !blog && <div>not home page</div>}
      </main>
    </div>
  );
}
