import "../styles/base.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Fraunces } from "next/font/google";
import Script from "next/script";
import useViewTransitions from "../components/useViewTransitions";

const fraunces = Fraunces({
  weight: ["300", "500", "700"],
  subsets: ["latin"],
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function App({ Component, pageProps }) {
  useViewTransitions();

  return (
    <div className={`app-wrapper ${fraunces.className}`}>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
