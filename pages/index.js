import Head from "next/head";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TypeItLine from "../components/TypeItLine";
import Image from "next/image";
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
        <TypeItLine />
        {intro.map((text, index) => {
          return <p key={index} dangerouslySetInnerHTML={{ __html: text }}></p>;
        })}
      </div>
    </Layout>
  );
}
