import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = (props) => {
  const router = useRouter();
  const page = router.route.replaceAll("/", "");
  const [activeLink, setActiveLink] = useState(page === "" ? "home" : page);

  useEffect(() => {
    if (activeLink.includes("blog")) {
      setActiveLink("blog");
    }
  }, [activeLink]);

  return (
    <header>
      <nav role="navigation">
        <ul>
          <li id="nav-home" className={activeLink === "home" ? "active" : ""}>
            <Link href="/" onClick={() => setActiveLink("home")}>
              Home
            </Link>
          </li>
          <li
            id="nav-experience"
            className={activeLink === "projects" ? "active" : ""}
          >
            <Link href="/projects" onClick={() => setActiveLink("projects")}>
              Projects
            </Link>
          </li>
          <li
            id="nav-resume"
            className={activeLink === "resume" ? "active" : ""}
          >
            <Link href="/resume" onClick={() => setActiveLink("resume")}>
              Resume
            </Link>
          </li>
          <li
            id="nav-contact"
            className={activeLink === "contact" ? "active" : ""}
          >
            <Link href="/contact" onClick={() => setActiveLink("contact")}>
              Contact
            </Link>
          </li>
          {activeLink === "blog" && (
            <li
              id="nav-blog"
              className={activeLink.includes("blog") ? "active" : ""}
            >
              <Link href="/blog" onClick={() => setActiveLink("blog")}>
                Blog
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
