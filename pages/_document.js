import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var saved=localStorage.getItem('theme');document.documentElement.dataset.theme=saved?saved:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');})();`,
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
