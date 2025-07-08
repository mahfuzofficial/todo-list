import express from "express"
import {
  getTasks,
  createTask,
  updateTask,
  toggleComplete,
  deleteTask
} from "../controllers/taskController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// this will run for all below routes to check token
router.use(protect)

// get all tasks and also add new one
router.route("/").get(getTasks).post(createTask)

// update and delete task using id
router.route("/:id").put(updateTask).delete(deleteTask)

// extra route to just toggle completed true/false
router.patch("/:id/complete", toggleComplete)

export default router
