import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  { ignores: [".next/", "out/", "build/", "coverage/"] },
  ...coreWebVitals,
];

export default config;
