import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="p-2 text-lg text-white font-medium bg-blue-400">
            <Link to="/">Exam Platform</Link>
        </nav>
    )
}