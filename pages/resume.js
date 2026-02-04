import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";

const data = require("../data/content.json");

const work = data.work;
const awards = data.awards;
const skills = data.skills;
const ed = data.ed;

export default function ResumePage() {
  return (
    <Layout>
      <Head>
        <title>Resume</title>
        <link rel="canonical" href="https://aadittambe.com/resume/" />
      </Head>
      <div className="resume">
        <h1>Some of my experience and skills.</h1>
        <div className="ital source">
          <p>
            <Link
              href="/AaditTambe_Resume.pdf"
              alt="alt text"
              target="_blank"
              rel="noopener noreferrer"
            >
              Here’s
            </Link>{" "}
            a PDF resume, if that’s what you’re looking for.
          </p>
        </div>
        <div className="section">
          <h2 id="experience">💼 Work experience</h2>
          {work.map((d, i) => (
            <div className="item" key={i}>
              <h3 className="org">{d.name}</h3>
              <div className="exp">
                <div className="left">
                  <h4 className="dates">{d.dates}</h4>
                </div>
                <div className="right">
                  <h4 className="title">{d.title}</h4>
                  <p className="desc">{d.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="section">
          <h2>🏆 Awards</h2>
          {awards.map((d, i) => (
            <div className="item" key={i}>
              <h3 className="">
                {d.event} ({d.year})
              </h3>
              <p className="">
                {d.category}
                {d.project && (
                  <>
                    <span> for </span>
                    <a href={d.link} target="_blank" rel="noreferrer">
                      {d.project}
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
        <div className="section skls">
          <h2 id="skills">🛠 Skills</h2>
          <div className="skills">
            {skills.map((d, i) => (
              <div className="skill" key={i}>
                <h3>{d.name}</h3>
                {d.tools.map((skills, i) => (
                  <p key={i}>{skills}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="section">
          <h2 id="education">📚 Education</h2>
          {ed.map((d, i) => (
            <div className="item" key={i}>
              <h3 className="org">{d.name}</h3>
              <div className="exp">
                <div className="left">
                  <h4 className="dates">{d.year}</h4>
                </div>
                <div className="right">
                  <h4 className="title">
                    {d.degree}, {d.focus}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
