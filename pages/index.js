import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";
const data = require("../data/content.json");

const intro = data.intro;

export default function Home({}) {
  return (
    <Layout home>
      <Head>
        <title>Aadit Tambe</title>
        <link rel="canonical" href="https://aadittambe.com/" />
      </Head>

      <div className="home">
        <div>
          <h1>
            <span className="wave">👋🏽</span> Hi — I am Aadit.
          </h1>
        </div>
        <p>
          I am a journalist who specializes in telling visual stories with code.
        </p>
        <p>
          Currently I am based in Washington, D.C., and work on the News Design
          team at The Washington Post, building rich, highly customized
          interactive stories and web applications.
        </p>
        <p>
          I was a part of the team at the Post that won the{" "}
          <a
            rel="noreferrer"
            target="_blank"
            aria-label="pulitzer website"
            href="https://www.pulitzer.org/winners/staff-washington-post-0"
          >
            2024 Pulitzer Prize{" "}
          </a>
          in National Reporting for our ‘American Icon’ series, which chronicled
          the rise of the AR-15 rifle in the U.S.
        </p>
        <p>
          In case you’re wondering, the visualization at the top represents my{" "}
          <Link href="/projects">projects</Link>, grouped by my primary
          contribution — web development, graphics, data analysis, or reporting.
          But that’s not all that{" "}
          <Link href="/resume#skills">I’m good at.</Link>
        </p>

        <p>
          Feel free to <Link href="/contact">get in touch</Link> — I’d love to
          hear from you. And thank you for stopping by.
        </p>
      </div>
    </Layout>
  );
}
