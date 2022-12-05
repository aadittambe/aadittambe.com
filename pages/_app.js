import Head from "next/head";
import '../styles/_base.scss'
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
const data = require('../data/content.json')

function app({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#3c1742" />
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
