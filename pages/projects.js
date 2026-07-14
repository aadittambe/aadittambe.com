import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import Head from "next/head";
import Layout from "../components/layout";
import { getSortedProjectsData } from "../lib/projects";

const CustomSpinner = ({ size = 36, color = "var(--site-text)" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 50 50"
    role="status"
    aria-label="loading"
  >
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="31.4 31.4"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 25 25"
        to="360 25 25"
        dur="0.9s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const Story = ({
  slug,
  url,
  img,
  imgAlt,
  org,
  tag,
  title,
  hasContent,
  description,
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "50% 0% -10% 0%",
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // img is optional — a project can have no thumbnail yet. A bare filename is
  // resolved against public/images/projects/; a full URL is used as-is.
  const imgSrc = img
    ? img.startsWith("https")
      ? img
      : `/images/projects/${img}`
    : null;

  const pageHref = hasContent ? `/projects/${slug}` : null;

  // The image and title point at the card's best destination: its own page if
  // it has one, otherwise the live project. Some cards have neither, so each
  // slot falls back to a plain tag — a <span> in the title, since a <p> can't
  // legally contain a <div>.
  const linkAttrs = pageHref
    ? { href: pageHref }
    : url
      ? { href: url, target: "_blank", rel: "noopener noreferrer" }
      : null;
  const LinkTag = pageHref ? Link : "a";

  const Media = linkAttrs ? LinkTag : "div";
  const Title = linkAttrs ? LinkTag : "span";

  const media = (
    <>
      <div
        className="story-spinner"
        style={{ opacity: imgSrc && isLoaded ? 0 : 1 }}
      >
        {imgSrc && !isLoaded && <CustomSpinner />}
      </div>
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={imgAlt || title || ""}
          fill
          sizes="(max-width: 672px) 100vw, 236px"
          style={{ objectFit: "cover", objectPosition: "50% 0%" }}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </>
  );

  return (
    <div className={`story ${inView ? "reveal" : "no-reveal"}`} ref={ref}>
      <Media className="story-media" {...linkAttrs}>
        {media}
      </Media>
      <div className="card-text">
        <p className="story-org">
          {org}
          {tag && <span className="story-tag">{tag}</span>}
        </p>
        <p className="story-name">
          <Title {...linkAttrs}>{title}</Title>
        </p>
        <p className="story-description">{description}</p>
        <div className="card-actions">
          {url && (
            <a
              className="card-btn card-btn--primary"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View project&nbsp;↗
            </a>
          )}
          {pageHref && (
            <Link className="card-btn card-btn--ghost" href={pageHref}>
              Read more&nbsp;→
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Tile = ({ url, img, imgAlt, org, title }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "50% 0% -10% 0%",
  });

  const [isLoaded, setIsLoaded] = useState(false);

  const imgSrc = img
    ? img.startsWith("https")
      ? img
      : `/images/projects/${img}`
    : null;

  return (
    <a
      className={`tile ${inView ? "reveal" : "no-reveal"}`}
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="tile-media">
        <div
          className="story-spinner"
          style={{ opacity: imgSrc && isLoaded ? 0 : 1 }}
        >
          {imgSrc && !isLoaded && <CustomSpinner size={24} />}
        </div>
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={imgAlt || title || ""}
            fill
            sizes="(max-width: 672px) 50vw, 236px"
            style={{ objectFit: "cover" }}
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </div>
      <div className="tile-text">
        <p className="tile-org">{org}</p>
        <p className="tile-name">{title}</p>
      </div>
    </a>
  );
};

export async function getStaticProps() {
  const projects = getSortedProjectsData();
  const cardProjects = projects.filter((p) => p.description);
  const tileProjects = projects.filter((p) => !p.description);

  return {
    props: {
      cardProjects,
      tileProjects,
    },
  };
}

export default function ProjectsPage({ cardProjects = [], tileProjects = [] }) {
  return (
    <Layout>
      <Head>
        <title>Aadit Tambe — Projects</title>
        <meta
          name="description"
          content="A selection of Aadit Tambe's projects — interactive stories, data visualizations, graphics, and web applications."
        />
        <link rel="canonical" href="https://aadittambe.com/projects/" />
      </Head>
      <div className="projects">
        <div className="intro">
          <h1>A selection of my work.</h1>
          <p>
            I specialize in telling data-driven stories visually, and my work
            helps people understand the news and make sense of the policies that
            impact them.
          </p>
          <p>
            This page includes a sample of projects I have worked on for{" "}
            <a href="https://www.washingtonpost.com/">The Washington Post</a>,{" "}
            <a href="https://merrill.umd.edu/howard-center-for-investigative-journalism">
              the Howard Center for Investigative Journalism
            </a>
            , <a href="https://cnsmaryland.org/">Capital News Service</a>,{" "}
            <a href="https://www.nbcnews.com/datagraphics">NBC News</a>, as well
            as personal practice projects. My work demonstrates my commitment to
            figuring out programming concepts I may not know.
          </p>
        </div>
        <div className="grid">
          {cardProjects.map((d) => (
            <Story
              key={d.slug}
              slug={d.slug}
              url={d.url}
              img={d.img}
              imgAlt={d.imgAlt}
              org={d.org}
              tag={d.tag}
              title={d.title}
              hasContent={d.hasContent}
              description={d.description}
            />
          ))}
        </div>
        {tileProjects.length > 0 && (
          <div className="tile-grid">
            {tileProjects.map((d) => (
              <Tile
                key={d.slug}
                url={d.url}
                img={d.img}
                imgAlt={d.imgAlt}
                org={d.org}
                title={d.title}
              />
            ))}
          </div>
        )}
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
