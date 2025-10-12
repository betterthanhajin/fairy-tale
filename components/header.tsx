"use client";
import Link from "next/link";

export const Header = () => {
    return (
        <nav className="p-4 backdrop-filter fixed left-0 right-0 top-0 z-100">
            <ul className="text-right font-bold text-white cursor-pointer">
              <li><Link href="/"></Link>Home</li>
              <li>Works</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
        </nav>
    )
}

export default Header;