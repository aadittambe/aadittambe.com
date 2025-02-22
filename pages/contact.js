import Head from "next/head";
import React from "react";
import Layout from "../components/layout";

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
      name: "Mastodon",
      text: "vis.social/aadittambe",
      link: "https://vis.social/@aadittambe",
      inActive: true,
    },
    {
      name: "Bluesky",
      text: "aadittambe.bsky.social",
      link: "https://bsky.app/profile/aadittambe.bsky.social",
      inActive: true,
    },
    {
      name: "Twitter",
      text: "aadittambe",
      link: "https://twitter.com/aadittambe",
      inActive: true,
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Contact</title>
        <link rel="canonical" href="https://aadittambe.com/contact/" />
      </Head>
      <div className="contact container">
        <h1>☎️ Contact</h1>
        {socials.map((s, i) => (
          <div key={i} className="flex">
            <p className="left">{s.name}</p>
            <p
              className="right"
              style={{
                textDecoration:
                  s.inActive &&
                  "line-through solid rgba(48, 56, 65, 0.6) 1.5px",
              }}
            >
              {s.link ? (
                <a href={s.link} target="_blank">
                  {s.text}
                </a>
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
