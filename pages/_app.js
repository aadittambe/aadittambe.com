import { useState } from "react";
import "../styles/base.scss";

export default function App({ Component, pageProps }) {
  const [test, setTest] = useState(false);
  return <Component test={test} {...pageProps} />;
}
