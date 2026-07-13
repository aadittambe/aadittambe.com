import { compareDesc } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import {
  getAllProjectSlugs,
  getProjectDataBySlug,
  getSortedProjectsData,
} from "../../lib/projects";
import apStyleDate from "ap-style-date";
const { longAP } = apStyleDate;

export default function Project({ projectData, prevProject, nextProject }) {
  return (
    <Layout>
      <div className="post project-post">
        <Head>
          <title>{projectData.title}</title>
        </Head>

        <main>
          <article>
            <h1>{projectData.title}</h1>
            <p>{projectData.org}</p>
            {/* <p>{longAP(projectData.date)}</p> */}
            {projectData.url && (
              <p>
                <a href={projectData.url} rel="noreferrer" target="_blank">
                  View live project ↗
                </a>
              </p>
            )}
            <div className="divider" />
            <div
              dangerouslySetInnerHTML={{ __html: projectData.contentHtml }}
            />
          </article>
          <nav>
            <div className="actions">
              {prevProject && (
                <>
                  <p className="label">← Previous</p>
                  <p>
                    <Link href={`/projects/${prevProject.slug}`}>
                      {prevProject.title}
                    </Link>
                  </p>
                </>
              )}
            </div>
            <div className="actions next">
              {nextProject && (
                <>
                  <p className="label">Next →</p>
                  <p>
                    <Link href={`/projects/${nextProject.slug}`}>
                      {nextProject.title}
                    </Link>
                  </p>
                </>
              )}
            </div>
          </nav>
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllProjectSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const sortedProjects = [...getSortedProjectsData()].sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  const projectIndex = sortedProjects.findIndex(
    (project) => project.slug === params.slug,
  );

  const projectData = await getProjectDataBySlug(params.slug);

  const prevProject =
    projectIndex > 0 ? sortedProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex >= 0 && projectIndex < sortedProjects.length - 1
      ? sortedProjects[projectIndex + 1]
      : null;

  return {
    props: {
      projectData,
      prevProject,
      nextProject,
    },
  };
}
