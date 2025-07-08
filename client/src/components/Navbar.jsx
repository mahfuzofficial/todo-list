import { Link } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-left">
        <svg width="18" height="18" viewBox="0 0 48 48" fill="currentColor">
          <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" />
        </svg>
        <span>To-Do List</span>
      </div>

      <div className="nav-links">
        {/* main pages link */}
        <Link to="/home">Home</Link>
        <Link to="/add">Add Task</Link>

        {/* dark mode switch */}
        <ThemeToggle />

        {/* profile pic (just icon) */}
        <Link to="/profile">
          <div
            className="avatar"
            style={{
              backgroundImage: `url("https://www.w3schools.com/howto/img_avatar.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "50%",
              width: 40,
              height: 40,
              backgroundColor: "#343537",
              marginLeft: 12
            }}
          ></div>
        </Link>
      </div>
    </header>
  )
}
