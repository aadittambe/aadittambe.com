import React from "react";
import { navLinks } from "../data";
import Link from "next/link";

const Header = props => {
    return (
        <header>
            <nav className="nav" role="navigation">
                <ul>
                    <Link href='/'>
                        <li id="nav-home" >
                            Home
                        </li>
                    </Link>
                    <Link href='/projects' id="nav-projects">
                        <li id="nav-experience">
                            Projects
                        </li>
                    </Link>
                    <Link href='/resume' id="nav-resume">
                        <li id="nav-resume">
                            Resume
                        </li>
                    </Link>
                </ul>
            </nav>
        </header>
    );
}

export default Header;