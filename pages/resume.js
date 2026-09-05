import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";

const data = require("../data/resume.json");

const work = data.work;
const awards = data.awards;
const skills = data.skills;
const ed = data.ed;

export default function ResumePage() {
  return (
    <Layout>
      <Head>
        <title>Aadit Tambe — Resume</title>
        <meta
          name="description"
          content="Aadit Tambe's experience, skills, and education."
        />
        <link rel="canonical" href="https://aadittambe.com/resume/" />
      </Head>
      <div className="wrap resume">
        <h1>Some of my experience and skills.</h1>
        <div>
          <p>
            <Link
              href="/AaditTambe_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Here’s
            </Link>{" "}
            a PDF resume, if that’s what you’re looking for.
          </p>
        </div>
        <div className="resume-section">
          <h2 id="experience">Work experience</h2>
          {work.map((d, i) => (
            <div className="resume-item" key={i}>
              <h3>{d.name}</h3>
              <div className="split">
                <div className="split-label">
                  <h4>{d.dates}</h4>
                </div>
                <div className="split-body">
                  <h4>{d.title}</h4>
                  <p>{d.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="resume-section">
          <h2>Awards</h2>
          {awards.map((d, i) => (
            <div className="resume-item" key={i}>
              <h3>
                {d.event} ({d.year})
              </h3>
              <p>
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
        <div className="resume-section">
          <h2 id="skills">Skills</h2>
          <div className="resume-skills">
            {skills.map((d, i) => (
              <div key={i}>
                <h3>{d.name}</h3>
                {d.tools.map((tool, i) => (
                  <p key={i}>{tool}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="resume-section">
          <h2 id="education">Education</h2>
          {ed.map((d, i) => (
            <div className="resume-item" key={i}>
              <h3>{d.name}</h3>
              <div className="split">
                <div className="split-label">
                  <h4>{d.year}</h4>
                </div>
                <div className="split-body">
                  <h4>
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
