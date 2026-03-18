import Head from "next/head";

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Aadit Tambe is a journalist and developer who tells data-driven stories visually — with code."
        />
        <meta
          name="keywords"
          content="Aadit Tambe, developer, designer, data journalist, graphics journalist, Washington Post"
        />
        <meta name="author" content="Aadit Tambe" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo592.png" />
        <link rel="shortcut icon" href="/logo592.png" />
        <link rel="apple-touch-icon" href="/logo592.png" />
        <link rel="me" href="https://vis.social/@aadittambe" />
        <meta name="theme-color" content="#f8f8f2" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#282a36" media="(prefers-color-scheme: dark)" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <main className={home && "home-wrapper"}>{children}</main>
    </div>
  );
}
