import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import connectDB from "./config/db.js"
import taskRoutes from "./routes/taskRoutes.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()
connectDB()

const app = express()

// ✅ CORS config
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))


// ✅ Explicitly handle all OPTIONS requests
app.options("*", cors())

app.use(express.json())

// Routes
app.use("/api/tasks", taskRoutes)
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log("Server running on port", PORT)
})
