import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    // user full name
    name: {
      type: String,
      required: true,
      trim: true
    },

    // email should be unique
    email: {
      type: String,
      required: true,
      unique: true
    },

    // user password
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

// before saving, we hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// when user login, we check password match or not
userSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password)
}

export default mongoose.model("User", userSchema)
