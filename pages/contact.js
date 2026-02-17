import Head from "next/head";
import React from "react";
import Layout from "../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

const ContactPage = () => {
  const socials = [
    {
      name: "Email",
      text: "aadit.tambe@gmail.com",
      link: "mailto:aadit.tambe@gmail.com",
    },
    { name: "Mobile phone", text: "(267) 250-1220" },
    {
      name: "LinkedIn",
      text: "in/aadittambe",
      link: "https://www.linkedin.com/in/aadittambe/",
    },
    {
      name: "GitHub",
      text: "aadittambe",
      link: "https://github.com/aadittambe/",
    },
    {
      name: "Bluesky",
      text: "aadittambe.bsky.social",
      link: "https://bsky.app/profile/aadittambe.bsky.social",
      inActive: true,
      tooltipText:
        "I occasionally check Bluesky because it’s where most of the developer-journalists I know hang out, but rarely post.",
    },
    {
      name: "Mastodon",
      text: "vis.social/aadittambe",
      link: "https://vis.social/@aadittambe",
      inActive: true,
      tooltipText: "I do not actively monitor Mastodon.",
    },
    {
      name: "Twitter",
      text: "aadittambe",
      link: "https://twitter.com/aadittambe",
      inActive: true,
      tooltipText:
        "My account is up, although I avoid checking Twitter. But during breaking-news events, it can’t be helped.",
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Contact</title>
        <link rel="canonical" href="https://aadittambe.com/contact/" />
      </Head>
      <div className="contact container">
        <h1>Ways to get in touch.</h1>
        {socials.map((s, i) => (
          <div key={i} className="social">
            <p className="left">{s.name}</p>
            <div className="right">
              {s.link ? (
                <>
                  <p>
                    <a href={s.link} target="_blank">
                      {s.text}
                    </a>
                  </p>
                  {s.inActive && (
                    <div>
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        data-tooltip-id={`${s.name}-tooltip`}
                        data-tooltip-content={s.tooltipText}
                        data-tooltip-place="right"
                        className="info-icon"
                        aria-hidden="false"
                        focusable="true"
                      />
                      <Tooltip
                        className="tooltip"
                        id={`${s.name}-tooltip`}
                        place="right"
                      />
                    </div>
                  )}
                </>
              ) : (
                <p>{s.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ContactPage;
