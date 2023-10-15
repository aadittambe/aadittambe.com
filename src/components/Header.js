import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = (props) => {
  const router = useRouter();
  const page = router.route.replaceAll("/", "");
  const [activeLink, setActiveLink] = useState(page === "" ? "home" : page);

  return (
    <header className="header">
      <nav className="nav" role="navigation">
        <ul>
          <li id="nav-home" className={activeLink === "home" && "active"}>
            <Link href="/" id="nav-home" onClick={() => setActiveLink("home")}>
              Home
            </Link>
          </li>
          <li
            id="nav-experience"
            className={activeLink === "projects" && "active"}
          >
            <Link
              href="/projects"
              id="nav-projects"
              onClick={() => setActiveLink("projects")}
            >
              Projects
            </Link>
          </li>
          <li id="nav-resume" className={activeLink === "resume" && "active"}>
            <Link
              href="/resume"
              id="nav-resume"
              onClick={() => setActiveLink("resume")}
            >
              Resume
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
