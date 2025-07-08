import express from "express"
import { login, register, getProfile } from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// signup route
router.post("/register", register)

// login route
router.post("/login", login)

// show logged in user info (need token)
router.get("/me", protect, getProfile)

export default router
