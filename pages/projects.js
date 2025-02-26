import React, { useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { TailSpin } from "react-loader-spinner";
import Head from "next/head";
import Layout from "../components/layout";

const data = require("../data/content.json");

const stories = data.stories;

const Story = (props) => {
  const { storyType, url, tools, img, org, alt, project } = props;

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "50% 0% -10% 0%",
  });

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`story ${storyType} ${inView ? "reveal" : "no-reveal"}`}
      ref={ref}
    >
      <a href={url} rel="noreferrer" target="_blank">
        <div
          style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}
        >
          <div
            style={{
              zIndex: 1,
              position: "absolute",
              top: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f7f7f7",
              opacity: !isLoaded ? 1 : 0,
              transition: ".4s ease-in-out",
            }}
          >
            {!isLoaded && (
              <TailSpin
                visible={true}
                height="36"
                width="36"
                color="black"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
          </div>
          <Image
            src={img.startsWith("https") ? img : `/images/${img}?.jpeg`}
            alt=""
            fill
            style={{ objectFit: "cover" }}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
        <div className="card-text">
          <p className="story-org">📍{org}</p>
          <p className="story-name">
            🔗 <span>{project}</span>
          </p>
        </div>
      </a>
    </div>
  );
};

export default function ProjectsPage() {
  const categories = [
    { topic: "Dev", class: "development", emoji: "🖥️" },
    { topic: "Graphics", class: "graphics", emoji: "📊" },
    { topic: "Data", class: "data", emoji: "📈" },
    { topic: "Docs", class: "docs", emoji: "📖" },
    { topic: "Written", class: "reporting", emoji: "✍️" },
  ];

  const [clicked, setClicked] = useState("all");

  return (
    <Layout>
      <Head>
        <title>Projects</title>
        <link rel="canonical" href="https://aadittambe.com/projects/" />
      </Head>
      <div className="projects">
        <div className="intro">
          <h1>Projects.</h1>
          <p>
            I specialize in telling data-driven stories visually, and my work
            helps people understand the news and make sense of the policies that
            impact them.
          </p>
          <p>
            This page includes projects I have worked on for{" "}
            <a href="https://www.washingtonpost.com/">The Washington Post</a>,{" "}
            <a href="https://merrill.umd.edu/howard-center-for-investigative-journalism">
              the Howard Center for Investigative Journalism
            </a>
            , <a href="https://cnsmaryland.org/">Capital News Service</a>,{" "}
            <a href="https://www.nbcnews.com/datagraphics">NBC News</a>,{" "}
            <a href="https://dailyiowan.com/">The Daily Iowan</a>, as well as
            personal practice projects. My work demonstrates my commitment to
            figuring out programming concepts I may not know.
          </p>
        </div>
        <fieldset>
          <legend>👀 Looking for a particular type of project?</legend>
          <div className="filters">
            <label
              className={`btn reset ${clicked === "all" && "active"}`}
              style={
                {
                  // backgroundColor: clicked === "all" ? "#F6C90E" : "#F7F7F7",
                }
              }
            >
              <input
                type="radio"
                name=""
                value=""
                id="all"
                onClick={(e) => {
                  setClicked("all");
                }}
              />
              🌎<br></br>All
            </label>
            {categories.map((cat, ind) => (
              <label
                className={`btn ${cat.class === clicked && "active"}`}
                key={ind}
                style={
                  {
                    // backgroundColor: cat.class === clicked ? "#F6C90E" : "#F7F7F7",
                  }
                }
              >
                <input
                  type="radio"
                  name=""
                  value=""
                  id={cat.class}
                  onClick={(e) => {
                    setClicked(cat.class);
                  }}
                />
                {cat.emoji}
                <br></br>
                {cat.topic}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid">
          {stories
            .filter((d) => d.show !== "false")
            .filter((d) =>
              clicked === "all" ? d : d.storyType.includes(clicked)
            )
            .map((d, ind) => {
              return (
                <Story
                  key={ind}
                  storyType={d.storyType}
                  url={d.url}
                  tools={d.tools}
                  img={d.img}
                  org={d.org}
                  alt={d.alt}
                  project={d.project}
                />
              );
            })}
        </div>
        <div className="source">
          <p>
            I am a supporter of open-source code — the source code for this
            website is available on{" "}
            <a href="https://github.com/aadittambe/aadittambe.com">GitHub</a>.
          </p>
        </div>
      </div>
    </Layout>
  );
}
