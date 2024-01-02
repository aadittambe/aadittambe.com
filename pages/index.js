import Head from "next/head";
import Home from "../src/components/Home.js";
import Image from "next/image";
import Header from "../src/components/Header";

// import styles from '../styles/Home.module.scss'

// import Hero from '../.next/src/components/Hero'
import Snowfall from "react-snowfall";
const HomePage = (props) => {
  const { data } = props;
  return (
    <div className={""}>
      <Snowfall
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
        }}
        snowflakeCount={50}
      />
      <Home data={data} />
    </div>
  );
};

export default HomePage;
