import mongoose from "mongoose"

const connectDB = async () => {
  try {
    // connect mongo from .env link
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Mongo connected")
  } catch (err) {
    // if some error happen in db connect
    console.log("DB error:", err)
    process.exit(1)
  }
}

export default connectDB
