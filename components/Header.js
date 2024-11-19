import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Toggle from "react-toggle";

const Header = (props) => {
  const { data, setShowSnow, showSnow, test } = props;
  const router = useRouter();
  const page = router.route.replaceAll("/", "");
  const [activeLink, setActiveLink] = useState(page === "" ? "home" : page);

  useEffect(() => {
    if (page === "colophon") {
      setActiveLink(null);
    }
  }, [page]);

  console.log(test);

  return (
    <header className="header">
      <nav className="nav" role="navigation">
        <ul>
          <li id="nav-home" className={activeLink === "home" ? "active" : ""}>
            <Link href="/" onClick={() => setActiveLink("home")}>
              <p>Home</p>
            </Link>
          </li>
          <li
            id="nav-experience"
            className={activeLink === "projects" ? "active" : ""}
          >
            <Link href="/projects" onClick={() => setActiveLink("projects")}>
              <p>Projects</p>
            </Link>
          </li>
          <li
            id="nav-resume"
            className={activeLink === "resume" ? "active" : ""}
          >
            <Link href="/resume" onClick={() => setActiveLink("resume")}>
              <p>Resume</p>
            </Link>
          </li>
          <li
            id="nav-contact"
            className={activeLink === "contact" ? "active" : ""}
          >
            <Link href="/contact" onClick={() => setActiveLink("contact")}>
              <p>Contact</p>
            </Link>
          </li>
        </ul>
      </nav>
      {/* <label className="label">
        <Toggle
          defaultChecked={true}
          icons={false}
          onChange={() => {
            setShowSnow(!showSnow);
          }}
        />
        <span>❄️</span>
      </label> */}
    </header>
  );
};

export default Header;
