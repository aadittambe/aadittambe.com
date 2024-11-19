import Head from "next/head";

import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import localFont from "next/font/local";

const myFont = localFont({ src: "../public/assets/Fraunces.ttf" });

export default function Layout({ children, className, home, blog }) {
  return (
    <div className={myFont.className}>
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
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
}