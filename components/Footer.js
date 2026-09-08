import apStyleDate from "ap-style-date";
import LinkIcon from "./LinkIcon";
const { longAP } = apStyleDate;

const Footer = () => {
  const apUpdatedDate = process.env.NEXT_PUBLIC_MODIFIED_DATE
    ? longAP(process.env.NEXT_PUBLIC_MODIFIED_DATE)
    : null;

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="divider"></div>
        <p>
          © Site developed by Aadit Tambe |{" "}
          <a
            className="icon-link"
            href="https://github.com/aadittambe/aadittambe.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="icon-link-label">Source code</span>
            <LinkIcon />
          </a>{" "}
          {apUpdatedDate && `| Last updated ${apUpdatedDate}`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
