import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Footer = (props) => {
  return (
    <footer className="footer">
      <hr></hr>
      <p>
        © Site developed by Aadit Tambe |{" "}
        <a href="https://github.com/aadittambe/aadittambe.com">Source code</a> |{" "}
        <Link href="/contact">Colophon</Link> | 2019 –{" "}
        {new Date().getFullYear()}{" "}
      </p>
    </footer>
  );
};

export default Footer;
