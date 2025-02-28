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
    { name: "Mobile phone", text: "+82 10-4570-1501" },
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
        <h1>Contact.</h1>
        {socials.map((s, i) => (
          <div key={i} className="flex">
            <p className="left">{s.name}</p>
            <p className="right">
              {s.link ? (
                <>
                  <a href={s.link} target="_blank">
                    {s.text}
                  </a>
                  {s.inActive && (
                    <>
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        data-tooltip-id={`${s.name}-tooltip`}
                        data-tooltip-content={s.tooltipText}
                        data-tooltip-place="right"
                        style={{
                          width: "20px",
                          verticalAlign: "middle",
                          marginLeft: "12px",
                        }}
                      />
                      <Tooltip
                        className="tooltip"
                        id={`${s.name}-tooltip`}
                        place="right"
                      />
                    </>
                  )}
                </>
              ) : (
                s.text
              )}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ContactPage;
