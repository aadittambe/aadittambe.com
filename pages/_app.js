import { useState } from "react";
import Head from "next/head";
import "../styles/base.scss";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Snowfall from "react-snowfall";

const data = require("../data/content.json");

function App({ Component, pageProps }) {
  const [isSnowing, setIsSnowing] = useState(true);

  return (
    <>
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
      <div id="container" className="container">
        {isSnowing && (
          <Snowfall
            style={{
              position: "fixed",
              width: "100vw",
              height: "100vh",
            }}
            snowflakeCount={50}
          />
        )}
        <Header isSnowing={isSnowing} setIsSnowing={setIsSnowing} />
        <Component
          isSnowing={isSnowing}
          setIsSnowing={setIsSnowing}
          data={data}
          {...pageProps}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
