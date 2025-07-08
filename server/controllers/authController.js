import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

// function to make jwt token
const genToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  })
}

// user register
export const register = async (req, res) => {
  const { name, email, password } = req.body

  // check all field filled or not
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All field required" })
  }

  // already user exist with same email
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({ message: "User already exist" })
  }

  // create new user
  const user = await User.create({ name, email, password })

  // send token to frontend
  res.status(201).json({ token: genToken(user._id) })
}

// user login
export const login = async (req, res) => {
  const { email, password } = req.body

  // find user by email
  const user = await User.findOne({ email })

  // check password match or not
  if (user && (await user.matchPassword(password))) {
    return res.json({ token: genToken(user._id) })
  }

  res.status(401).json({ message: "Invalid login" })
}

// get logged in user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: "Something broke in server" })
  }
}
