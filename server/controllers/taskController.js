import Task from "../models/taskModel.js"

// get all tasks of logged in user
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json(tasks)
}

// add new task
export const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user._id
  })
  res.status(201).json(task)
}

// update full task (like title, desc, due date etc)
export const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  )
  res.json(task)
}

// just flip the completed true/false
export const toggleComplete = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id
  })
  task.completed = !task.completed
  await task.save()
  res.json(task)
}

// delete the task from db
export const deleteTask = async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id
  })
  res.json({ message: "Deleted" })
}
