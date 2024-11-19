import Head from "next/head";
import Link from "next/link";

import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout home>
      <div>
        <Head>
          <title>Aadit Tambe</title>
        </Head>

        <main>
          <h1>hi</h1>
          <Link href="/contact">contact</Link>{" "}
        </main>
      </div>
    </Layout>
  );
}
