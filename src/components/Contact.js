import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Contact = (props) => {
  const { data } = props;
  const intro = data.intro;

  return (
    <main className="contact">
      <h1>☎️ Contact</h1>
      <div className="flex">
        <p className="left">Email</p>
        <p className="right">
          <a href="mailto:aadit.tambe@gmail.com">aadit.tambe@gmail.com</a>
        </p>
      </div>
      <div className="flex">
        <p className="left">Mobile phone</p>
        <p className="right">+81 10-4570-1501</p>
      </div>
      <div className="flex">
        <p className="left">LinkedIn</p>
        <p className="right">
          <a
            href=" https://www.linkedin.com/in/aadittambe/"
            target="_blank"
            rel="noreferrer"
          >
            in/aadittambe
          </a>
        </p>
      </div>

      <div className="flex">
        <p className="left">Twitter</p>
        <p className="right">
          <a
            href="https://twitter.com/aadittambe"
            target="_blank"
            rel="noreferrer"
          >
            aadittambe
          </a>
        </p>
      </div>
      <div className="flex">
        <p className="left">Mastodon</p>
        <p className="right">
          <a
            href="https://vis.social/@aadittambe"
            target="_blank"
            rel="noreferrer"
          >
            vis.social/aadittambe
          </a>
        </p>
      </div>
      <div className="flex">
        <p className="left">Bluesky</p>
        <p className="right">
          <a
            href="https://bsky.app/profile/aadittambe.bsky.social"
            target="_blank"
            rel="noreferrer"
          >
            aadittambe.bsky.social
          </a>
        </p>
      </div>
      <div className="flex">
        <p className="left">GitHub</p>
        <p className="right">
          <a
            href="https://github.com/aadittambe/"
            target="_blank"
            rel="noreferrer"
          >
            aadittambe
          </a>
        </p>
      </div>
    </main>
  );
};

export default Contact;
