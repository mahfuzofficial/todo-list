import { BrowserRouter, Routes, Route } from "react-router-dom"
import { createContext, useEffect, useState } from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AddTask from "./pages/AddTask"
import Profile from "./pages/Profile"
import "./index.css"

export const ThemeContext = createContext()

export default function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("dark") === "true"
  })

  const toggle = () => {
    const newMode = !dark
    setDark(newMode)
    localStorage.setItem("dark", newMode)
  }

  useEffect(() => {
    document.body.className = dark ? "dark" : ""
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}
