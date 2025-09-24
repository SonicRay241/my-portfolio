import Logo from "../logo"
import Role from "./role"

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full px-4">
            <div className="w-full h-12 flex items-center justify-between">
                <Logo />
                <Role />
            </div>
        </nav>
    )
}