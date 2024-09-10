import TypeIt from "typeit-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faGithubAlt,
  faMastodon,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

import Sparklines from "./Sparklines";
import React from "react";

const Home = (props) => {
  const { data } = props;

  const intro = data.intro;

  return (
    <main className="home">
      <h1>
        <span className="wave">👋🏽</span> Hi — I am Aadit.
      </h1>
      <p>
        <span>I am a journalist who tells stories — but with&nbsp;</span>
        <span
          style={{ position: "relative", verticalAlign: "text-bottom" }}
          className="typeit"
        >
          <span
            style={{
              visibility: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            graphics. 📊
          </span>
          <span
            className="typeit"
            style={{
              position: "absolute",
              left: 0,
              whiteSpace: "nowrap",
              top: 0,
            }}
          >
            <>
              <TypeIt
                options={{
                  loop: true,
                  speed: 200,
                  waitUntilVisible: true,
                  lifeLike: true,
                }}
                getBeforeInit={(instance) => {
                  instance
                    .pause(1500)
                    .type("code. 🖥")
                    .pause(2000)
                    .delete(7)
                    .type("graphics. 📊")
                    .pause(2500)
                    .delete(11)
                    .type("design. 🎨")
                    .pause(2700)
                    .delete(9)
                    .type("data. 📈")
                    .pause(2100);

                  return instance;
                }}
              />
            </>
          </span>
        </span>
      </p>
      {intro.map((text, index) => {
        return index === 0 ? (
          <div key={index}>
            <p>{text}</p>
            <p>
              Recently, I was part of the team at the Post that won the{" "}
              <a
                rel="noreferrer"
                target="_blank"
                aria-label="pulitzer website"
                href="https://www.pulitzer.org/winners/staff-washington-post-0"
              >
                2024 Pulitzer Prize
              </a>{" "}
              in National Reporting for our &lsquo;American Icon&rsquo; series,
              which chronicled the rise of the AR-15 rifle in the U.S.
            </p>
            <p>
              My code contributions on GitHub in the last year look like
              this:&nbsp;
              <Sparklines />.
            </p>
          </div>
        ) : (
          <p key={index}>{text}</p>
        );
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
    </main>
  );
};

export default Home;
