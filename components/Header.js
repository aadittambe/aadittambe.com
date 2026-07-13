import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

const CONTEXTUAL_LINKS = [{ href: "/blog", label: "Blog" }];

const isActive = (route, href) =>
  href === "/" ? route === "/" : route === href || route.startsWith(`${href}/`);

const Header = () => {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.dataset.theme === "dark");
  }, []);

  const links = [
    ...NAV_LINKS,
    ...CONTEXTUAL_LINKS.filter(({ href }) => isActive(router.route, href)),
  ];

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  return (
    <header className="site-header">
      <div className="header-row">
        <nav role="navigation">
          <ul>
            {links.map(({ href, label }) => (
              <li
                key={href}
                className={isActive(router.route, href) ? "active" : ""}
              >
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? "💡" : "🌘"}
        </button>
      </div>
    </header>
  );
};

export default Header;
