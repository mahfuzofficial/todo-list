import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const protect = async (req, res, next) => {
  const auth = req.headers.authorization

  // check header has Bearer token or not
  if (auth && auth.startsWith("Bearer ")) {
    try {
      // decode the token using secret
      const decoded = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET)

      // get user from token id and remove password
      req.user = await User.findById(decoded.id).select("-password")

      return next()
    } catch (err) {
      // token wrong or expired
      return res.status(401).json({ message: "Token fail" })
    }
  }

  // if no token in header
  res.status(401).json({ message: "No token found" })
}

export { protect }
