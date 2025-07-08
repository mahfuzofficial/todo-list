import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
  {
    // which user added this task
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // task title (compulsory)
    title: {
      type: String,
      required: true
    },

    // this one optional
    description: String,

    // user can give due date also
    dueDate: Date,

    // by default it will be not completed
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    // mongo will auto add createdAt and updatedAt
    timestamps: true
  }
)

export default mongoose.model("Task", taskSchema)
