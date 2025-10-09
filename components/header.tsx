import Link from "next/link";


export const Header = () => {
    return (
        <nav className="p-2 bg-white/60 backdrop-filter sticky left-0 right-0 top-0 z-100">
            <ul className="flex justify-evenly group font-medium">
              <li><Link href="/"></Link>Home</li>
              <li>Works</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
        </nav>
    )
}

export default Header;