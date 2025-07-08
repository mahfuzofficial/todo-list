import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import "../styles/Profile.css"

export default function Profile() {
  const [user, setUser] = useState({ name: "", email: "" })
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  // load user data from backend
  useEffect(() => {
    if (!token) return navigate("/login")

    fetch("https://todo-backend-sig0.onrender.com/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log("User fetch error:", err))
  }, [])

  // logout and clear token
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?")
    if (confirmLogout) {
      localStorage.removeItem("token")
      navigate("/login")
    }
  }

  return (
    <>
      <Navbar />
      <div className="main profile-container">
        <div className="content profile-card">
          {/* avatar and name */}
          <div className="profile-header">
            <div
              className="profile-avatar"
              style={{
                backgroundImage: `url("https://www.w3schools.com/howto/img_avatar.png")`
              }}
            ></div>

            <div>
              <p className="profile-name">{user.name}</p>
              <p className="profile-email">{user.email}</p>
            </div>
          </div>

          {/* edit button (not working yet) */}
          <div
            className="profile-option"
            onClick={() => alert("Edit coming soon")}
          >
            <div className="icon-box">✏️</div>
            <p>Edit Profile</p>
          </div>

          {/* logout button */}
          <div className="profile-option" onClick={handleLogout}>
            <div className="icon-box">🚪</div>
            <p>Logout</p>
          </div>
        </div>
      </div>
    </>
  )
}
