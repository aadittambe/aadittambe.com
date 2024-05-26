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

const Home = (props) => {
  const { data } = props;

  const intro = data.intro;

  return (
    <main className="home">
      <h1>
        <span className="wave">👋🏽</span> Hi, I am Aadit!
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
        Currently I am based in<span> </span>
        <span className="city-parent">
          <span className="seoul-hidden">Seoul, South Korea,</span>
          <span className="dc" style={{ letterSpacing: "1px" }}>
            Washington D.C.,
          </span>
          <span className="seoul">
            <TypeIt
              options={{
                speed: 150,
                waitUntilVisible: true,
                lifeLike: true,
                cursor: false,
              }}
              getBeforeInit={(instance) => {
                instance.pause(10000).type("Seoul, South Korea,");
                return instance;
              }}
            />
          </span>
        </span>
        &nbsp;and work on the News Design team at The Washington Post, building
        rich, highly customized interactive storytelling experiences and web
        apps.
      </p>
      {intro.map((text, index) =>
        index === 0 ? (
          <>
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
              in National Reporting for our &lsquo;American Icon&lsquo; series,
              which chronicled the rise of the AR-15 rifle in the U.S.
              {/* Projects
              I have worked on have won awards from the Society for News Design,
              Online News Organization, and the White House
              Correspondents&lsquo; Association. */}
            </p>
            <p>
              My code contributions on GitHub in the last year look like
              this:&nbsp;
              <Sparklines />.
            </p>
            <p key={index}>{text}</p>
          </>
        ) : index === 1 ? (
          <>
            greee
            <p key={index}>{text}</p>
          </>
        ) : (
          <p key={index}>{text}</p>
        )
      )}
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

//  <h1><span className='wave'>👋🏽</span> Hi, I am Aadit!</h1>
//         <p><span style={{ display: "none" }}>👨🏽‍💻</span>I tell stories — but with<span className='mob-jump'><br /></span> <span className="typeit">
//             <TypeIt
//                 options={{
//                     loop: true,
//                     speed: 200,
//                     waitUntilVisible: true,
//                     lifeLike: true,
//                 }}
//                 getBeforeInit={(instance) => {
//                     instance
//                         .pause(1500)
//                         .type("code. 🖥")
//                         .pause(2000)
//                         .delete(7)
//                         .type("graphics. 📊")
//                         .pause(2500)
//                         .delete(11)
//                         .type("design. 🎨")
//                         .pause(2700)
//                         .delete(9)
//                         .type("data. 📈")
//                         .pause(2100);

//                     return instance;
//                 }}
//             /></span></p>

//
