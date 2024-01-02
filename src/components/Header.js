import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Toggle from "react-toggle";

const Header = (props) => {
  const { isSnowing, setIsSnowing } = props;
  const router = useRouter();
  const page = router.route.replaceAll("/", "");
  const [activeLink, setActiveLink] = useState(page === "" ? "home" : page);

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
      <div>
        <label>
          <Toggle
            defaultChecked={isSnowing}
            onChange={() => setIsSnowing(!isSnowing)}
            className="snowToggle"
            icons={{
              checked: (
                <div style={{ fontSize: "12px", paddingTop: "5px" }}>❄️</div>
              ),
              unchecked: (
                <div style={{ fontSize: "14px", paddingTop: "5px" }}>❄️</div>
              ),
            }}
          />
        </label>
      </div>
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
