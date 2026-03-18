import { useRouter } from "next/router";
import Link from "next/link";
import D3Viz from "./D3Viz";

const NAV_LINKS = [
  { href: "/", label: "Home", key: "home" },
  { href: "/projects", label: "Projects", key: "projects" },
  { href: "/resume", label: "Resume", key: "resume" },
  { href: "/contact", label: "Contact", key: "contact" },
];

const Header = () => {
  const router = useRouter();

  const page = router.route.replace(/\//g, "");
  const activeLink =
    page === "" ? "home" : page.startsWith("blog") ? "blog" : page;

  return (
    <header className="site-header">
      <div className="viz">
        <D3Viz />
      </div>

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
    </header>
  );
};

export default Header;
