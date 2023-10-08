import React, { useEffect, useRef } from "react";
import TypeIt from "typeit-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faGithubAlt,
  faMastodon,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import Sparklines from "./Sparklines";

const Home = (props) => {
  const { data } = props;

  // const containerRef = useRef(null);
  // const butWithRef = useRef(null);
  // const typeitRef = useRef(null);

  // useEffect(() => {
  //   const width = containerRef.current.offsetWidth;

  //   console.log(width);
  // }, []);

  const intro = data.intro;

  return (
    <main className="home">
      <h1>
        <span className="wave">👋🏽</span> Hi, I am{" "}
        <span style={{ color: "#F6C90E" }}>Aadit!</span>
      </h1>
      <p>
        <span>I am a journalist who tells stories — but with&nbsp;</span>
        <span style={{ position: "relative" }}>
          <span style={{ visibility: "hidden", whiteSpace: "nowrap" }}>
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
          </span>
        </span>
      </p>
      <p>
        Currently I am based in&nbsp;
        <span className="city-parent">
          <span className="seoul-hidden">Seoul, South Korea</span>
          <span className="dc" style={{ letterSpacing: "1.4px" }}>
            Washington D.C.
          </span>
          <span className="seoul">
            <TypeIt
              options={{
                // loop: true,
                speed: 200,
                waitUntilVisible: true,
                lifeLike: true,
                cursor: false,
              }}
              getBeforeInit={(instance) => {
                instance.pause(10000).type("Seoul, South Korea");
                //   .pause(2000)
                //   .delete(7)
                //   .type("graphics. 📊")
                //   .pause(2500)
                //   .delete(11)
                //   .type("design. 🎨")
                //   .pause(2700)
                //   .delete(9)
                //   .type("data. 📈")
                //   .pause(2100);

                return instance;
              }}
            />
          </span>
          {/* <span className="seoul">Seoul, South Korea</span> */}
        </span>
        , and work on the News Design team at The Washington Post, building
        rich, highly customized interactive storytelling experiences and web
        apps.
      </p>

      {intro.map((text, index) =>
        index === 0 ? (
          <p key={index}>
            {text} <Sparklines />.
          </p>
        ) : (
          <p key={index}>{text}</p>
        ),
      )}
      <div className="home-buttons">
        <a
          href="https://vis.social/@aadittambe"
          rel="noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon className="icon" icon={faMastodon} size="2x" />
        </a>
        <a
          href="https://twitter.com/aadittambe/"
          rel="noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon className="icon" icon={faTwitter} size="2x" />
        </a>
        <a
          href="https://github.com/aadittambe"
          rel="noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon className="icon" icon={faGithubAlt} size="2x" />
        </a>
        <a
          href="https://www.linkedin.com/in/aadittambe/"
          rel="noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon className="icon" icon={faLinkedin} size="2x" />
        </a>
        <a href="mailto:aadit.tambe@gmail.com" rel="noreferrer" target="_blank">
          <FontAwesomeIcon className="icon" icon={faEnvelope} size="2x" />
        </a>
      </div>
    </main>
  );
};

export default Home;
