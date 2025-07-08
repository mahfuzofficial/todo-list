import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { register } from "../api/tasksApi"

export default function Signup() {
  const nav = useNavigate()
  const [name, setName] = useState("")
  const [email, setE] = useState("")
  const [pass, setP] = useState("")

  // when user submit the form
  const submit = async (e) => {
    e.preventDefault()
    const d = await register({ name, email, password: pass })

    if (d.token) {
      localStorage.setItem("token", d.token)
      nav("/home")
    } else {
      alert(d.message || "Signup failed")
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Sign Up</h2>
    
        <form onSubmit={submit}>
          <input
            className="input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
  
          <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setE(e.target.value)}
          />
  
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setP(e.target.value)}
          />
  
          <button className="btn" style={{ background: "var(--accent)", color: "#fff" }}>
            Sign Up
          </button>
        </form>
    
        <Link className="auth-link" to="/login">
          Already have an account? Log in
        </Link>
      </div>
    </div>
  )
}
