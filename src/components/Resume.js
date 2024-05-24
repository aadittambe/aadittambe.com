import React from "react";

const Resume = (props) => {
  const { data } = props;
  const work = data.work;
  const ed = data.ed;
  const skills = data.skills;
  const awards = data.awards;

  return (
    <main className="resume">
      <h1>📝 Resume</h1>
      <div className="ital source">
        <p>
          And{" "}
          <a
            href="/docs/AaditTambe_Resume.pdf"
            alt="alt text"
            target="_blank"
            rel="noopener noreferrer"
          >
            here&apos;s
          </a>{" "}
          a PDF, if that&apos;s what you&apos;re looking for.
        </p>
      </div>
      <div className="section">
        <h2>💼 Work experience</h2>
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
        <h2>🛠 Skills</h2>
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
        <h2>📚 Education</h2>
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
    </main>
  );
};

export default Resume;
