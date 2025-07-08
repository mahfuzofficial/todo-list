import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../api/tasksApi"

export default function Login() {
  const nav = useNavigate()
  const [email, setE] = useState("")
  const [pass, setP] = useState("")

  // when form submit
  const submit = async (e) => {
    e.preventDefault()
    const d = await login({ email, password: pass })

    // if login success
    if (d.token) {
      localStorage.setItem("token", d.token)
      nav("/home")
    } else {
      alert(d.message || "Login failed")
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Log In</h2>

        <form onSubmit={submit}>
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
            Login
          </button>
        </form>

        <Link className="auth-link" to="/signup">
          No account? Sign up
        </Link>
      </div>
    </div>
  )
}
