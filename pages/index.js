import Head from "next/head";
import Link from "next/link";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faGithubAlt,
  faMastodon,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TypeItLine from "../components/TypeItLine";

const data = require("../data/content.json");

const intro = data.intro;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Aadit Tambeee</title>
      </Head>

      <div className="home">
        <h1>
          <span className="wave">👋🏽</span> Hi — I am Aadit.
        </h1>
        <TypeItLine />
        {intro.map((text, index) => {
          return <p key={index} dangerouslySetInnerHTML={{ __html: text }}></p>;
        })}
        <div>
          <a
            href="https://vis.social/@aadittambe"
            rel="noreferrer"
            target="_blank"
            aria-label="Mastodon"
          >
            <FontAwesomeIcon className="icon" icon={faMastodon} size="2x" />
          </a>
          <a
            href="https://twitter.com/aadittambe/"
            rel="noreferrer"
            target="_blank"
            aria-label="Twitter"
          >
            <FontAwesomeIcon className="icon" icon={faTwitter} size="2x" />
          </a>
          <a
            href="https://github.com/aadittambe"
            rel="noreferrer"
            target="_blank"
            aria-label="GitHub"
          >
            <FontAwesomeIcon className="icon" icon={faGithubAlt} size="2x" />
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
            href="mailto:aadit.tambe@gmail.com"
            rel="noreferrer"
            target="_blank"
            aria-label="email"
          >
            <FontAwesomeIcon className="icon" icon={faEnvelope} size="2x" />
          </a>
        </div>
      </div>
    </div>
  );
}
