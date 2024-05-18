import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = (props) => {
  const { data } = props;
  const router = useRouter();
  const page = router.route.replaceAll("/", "");
  const [activeLink, setActiveLink] = useState(page === "" ? "home" : page);

  useEffect(() => {
    if (page === "colophon") {
      setActiveLink(null);
    }
  }, [page]);

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
      {/* <nav>
                {navLinks.map((link, index) => {
                    return (
                        <ul>
                            <Link href={link.path}>
                                <li key={index}>{link.name}</li>
                            </Link>
                        </ul>
                    );
                })}
            </nav> */}
    </header>
  );
};

export default Header;
