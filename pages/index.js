import Head from "next/head";
import Layout from "../components/layout";
import Link from "next/link";
import D3Viz from "./../components/D3Viz";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>Aadit Tambe — a journalist and developer</title>
        <link rel="canonical" href="https://aadittambe.com/" />
      </Head>

      <div className="home">
        <div className="viz">
          <D3Viz />
        </div>
        <h1>
          <span className="wave">👋🏽</span> Hi — I am Aadit.
        </h1>
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
            rel="noopener noreferrer"
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
          The dots at the top represents my{" "}
          <Link href="/projects">projects</Link>, grouped by my primary
          contribution — web development, graphics, data analysis, or reporting.
          That’s not all <Link href="/resume#skills">I’m skilled at</Link>,
          though.
        </p>

        <p>
          Feel free to <Link href="/contact">get in touch</Link> — I’d love to
          hear from you. And thank you for stopping by.
        </p>
      </div>
    </Layout>
  );
}
