import apStyleDate from "ap-style-date";
const { longAP } = apStyleDate;

const Footer = (props) => {
  const apUpdatedDate = process.env.NEXT_PUBLIC_MODIFIED_DATE
    ? longAP(process.env.NEXT_PUBLIC_MODIFIED_DATE)
    : null;

  return (
    <footer>
      <div className="container">
        <div className="divider"></div>
        <p>
          © Site developed by Aadit Tambe |{" "}
          <a href="https://github.com/aadittambe/aadittambe.com">Source code</a>{" "}
          {apUpdatedDate && `| Last updated ${apUpdatedDate}`}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
