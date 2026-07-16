import { useSyncExternalStore } from "react";
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

// The current theme lives on <html data-theme>, set before hydration by the
// bootstrap script — the DOM is the source of truth, React just mirrors it.
const subscribeToTheme = (onChange) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
};

const Header = () => {
  const router = useRouter();
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    () => document.documentElement.dataset.theme === "dark",
    () => false, // server render: theme unknown until the client takes over
  );

  const links = [
    ...NAV_LINKS,
    ...CONTEXTUAL_LINKS.filter(({ href }) => isActive(router.route, href)),
  ];

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
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
