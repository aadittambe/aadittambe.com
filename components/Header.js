import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home", key: "home" },
  { href: "/projects", label: "Projects", key: "projects" },
  { href: "/resume", label: "Resume", key: "resume" },
  { href: "/contact", label: "Contact", key: "contact" },
];

const Header = () => {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.dataset.theme === "dark");
  }, []);

  const page = router.route.replace(/\//g, "");
  const activeLink =
    page === "" ? "home" : page.startsWith("blog") ? "blog" : page;

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
            {NAV_LINKS.map(({ href, label, key }) => (
              <li key={key} className={activeLink === key ? "active" : ""}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
            {activeLink === "blog" && (
              <li className="active">
                <Link href="/blog">Blog</Link>
              </li>
            )}
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
