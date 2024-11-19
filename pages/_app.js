import "../styles/base.scss";
import Layout from "../components/layout";
import Snowfall from "react-snowfall";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [isSnowing, setIsSnowing] = useState(true);
  return (
    <Layout isSnowing={isSnowing} setIsSnowing={setIsSnowing}>
      {isSnowing && <Snowfall />}
      <Component
        setIsSnowing={setIsSnowing}
        isSnowing={isSnowing}
        {...pageProps}
      />
    </Layout>
  );
}
