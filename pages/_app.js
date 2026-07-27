import "../styles/base.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Fraunces } from "next/font/google";

// Loaded as the variable font for the wonky letterforms (see base.scss).
// `opsz` is not optional here: Fraunces gates the wonk behind BOTH axes, so
// WONK alone renders identically to no WONK at all. That axis is what costs —
// the latin subset goes 37KB -> 67KB. Leave SOFT out; it adds ~53KB more.
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["WONK", "opsz"],
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
