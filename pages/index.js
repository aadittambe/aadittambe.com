import Head from "next/head";
import Layout from "../components/layout";

const data = require("../data/content.json");

const intro = data.intro;

export default function Home({}) {
  return (
    <Layout home>
      <Head>
        <title>Aadit Tambe</title>
        <link rel="canonical" href="https://aadittambe.com/" />
      </Head>

      <div className="home">
        <div>
          <h1>
            <span className="wave">👋🏽</span> Hi — I am Aadit.
          </h1>
        </div>
        {intro.map((text, index) => {
          return <p key={index} dangerouslySetInnerHTML={{ __html: text }}></p>;
        })}
      </div>
    </Layout>
  );
}
