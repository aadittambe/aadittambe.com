import React from "react";
import { navLinks } from "../data";
import Link from "next/link";

const Header = props => {
    return (
        <header>
            <nav className="nav" role="navigation">
                <ul>
                    <li id="nav-home" >
                        <Link href='/'>Home</Link>
                    </li>
                    <li id="nav-experience">
                        <Link href='/experience' id="nav-projects">Projects</Link>
                    </li>
                    <li id="nav-resume">
                        <Link href='/resume' id="nav-resume">Resume</Link>
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
}

export default Header;