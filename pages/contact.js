import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";

const ContactPage = (props) => {
  return (
    <Layout page>
      <div>
        <Head>
          <title>Contact page</title>
        </Head>

        <main>
          <h1>Say text here.</h1>
        </main>
      </div>
    </Layout>
  );
};

export default ContactPage;
