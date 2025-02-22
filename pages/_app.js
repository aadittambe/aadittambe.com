import "../styles/base.scss";
import Layout from "../components/layout";

export default function App({ Component, pageProps }) {
  console.log(pageProps);

  return <Component {...pageProps} />;
}
