import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var mq=window.matchMedia('(prefers-color-scheme: dark)');var saved=localStorage.getItem('theme');document.documentElement.dataset.theme=saved?saved:(mq.matches?'dark':'light');mq.addEventListener('change',function(e){if(!localStorage.getItem('theme'))document.documentElement.dataset.theme=e.matches?'dark':'light';});})();`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
