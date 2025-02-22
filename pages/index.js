import Head from "next/head";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TypeItLine from "../components/TypeItLine";
import Image from "next/image";

const data = require("../data/content.json");

const intro = data.intro;

export default function Home({}) {
  return (
    <div>
      <Head>
        <title>Aadit Tambe</title>
        <link rel="canonical" href="https://aadittambe.com/" />
      </Head>

      <div className="home container">
        <div className="headline-wrapper">
          <h1>
            <span className="wave">👋🏽</span> Hi — I am Aadit.
          </h1>
        </div>
        <TypeItLine />
        {intro.map((text, index) => {
          return <p key={index} dangerouslySetInnerHTML={{ __html: text }}></p>;
        })}
        <div>
          <a
            href="mailto:aadit.tambe@gmail.com"
            rel="noreferrer"
            target="_blank"
            aria-label="email"
          >
            <FontAwesomeIcon className="icon" icon={faEnvelope} size="2x" />
          </a>
          <a
            href="https://www.linkedin.com/in/aadittambe/"
            rel="noreferrer"
            target="_blank"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon className="icon" icon={faLinkedin} size="2x" />
          </a>
          <a
            href="https://github.com/aadittambe"
            rel="noreferrer"
            target="_blank"
            aria-label="GitHub"
          >
            <FontAwesomeIcon className="icon" icon={faGithub} size="2x" />
          </a>
        </div>
      </div>
    </div>
  );
}
