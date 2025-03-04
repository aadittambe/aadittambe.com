import Link from "next/link";
import Layout from "../components/layout";

const Custom404 = () => {
  return (
    <Layout>
      <div className="custom-404">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <p>
          Return to the <Link href="/">homepage</Link>, check out some of my{" "}
          <Link href="/projects">projects</Link>, or{" "}
          <Link href="/contact">get in touch</Link> if you want to chat.
        </p>
      </div>
    </Layout>
  );
};

export default Custom404;
