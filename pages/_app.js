import Head from "next/head";
import '../styles/_base.scss'
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
const data = require('../data/content.json')

function app({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Aadit Tambe — a journalist and developer</title>
        <meta name="description" content="Aadit Tambe is a journalist and developer who tells data-driven stories visually — with code." />
        <link rel="icon" href="/logo592.png" />
        <link rel="shortcut icon" href="/static/logo592.png" />
        <link rel="apple-touch-icon" href="/static/logo592.png" />
        <link rel="me" href="https://vis.social/@aadittambe" />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=UA-157385072-1`}
        />
        <script
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
      </Head>
      <div id="container">
        <Header />
        <Component data={data} {...pageProps} />
        <Footer />
      </div>
    </>
  );
}

export default app
