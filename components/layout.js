import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Script from "next/script";

import { Fraunces } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"] });

export default function Layout({ children, home, blog }) {
  return (
    <div className={fraunces.className}>
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
      </Head>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=UA-157385072-1`}
      />
      <Script
        id="google"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-157385072-1', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <main className={home && "home-wrapper"}>
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
}
