import "../styles/base.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`app-wrapper ${fraunces.className}`}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
