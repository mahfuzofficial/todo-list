import { useContext } from "react"
import { ThemeContext } from "../App"

// button to switch light/dark theme
export default function ThemeToggle() {
  // get dark mode status and toggle function from context
  const { dark, toggle } = useContext(ThemeContext)

  // show sun icon if dark mode is on, else moon icon
  return (
    <button onClick={toggle} className="theme-btn" title="Toggle theme">
      {dark ? "☀️" : "🌙"}
    </button>
  )
}
