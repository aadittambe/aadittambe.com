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
        <link rel="icon" href="/favicon.jpg" />
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
