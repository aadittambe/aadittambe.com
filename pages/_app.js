import "../styles/base.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <div className="app-wrapper">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
