import React from "react";

const Footer = (props) => {
  return (
    <footer className="footer">
      <hr></hr>
      <p>
        © Site developed by Aadit Tambe —{" "}
        <span className="source ital">
          <a href="https://github.com/aadittambe/aadittambe.com">view source</a>
        </span>
        . Inspiration for ❄️ credited to{" "}
        <a href="https://build.washingtonpost.com/">WPDS</a>. | 2019 – 2023
      </p>
    </footer>
  );
};

export default Footer;
