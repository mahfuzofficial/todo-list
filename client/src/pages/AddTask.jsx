import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import TaskForm from "../components/TaskForm"
import { addTask } from "../api/tasksApi"

export default function AddTask() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  // when form submit
  const handleAdd = async ({ title, description, dueDate }) => {
    await addTask(token, { title, description, dueDate })
    navigate("/home")
  }

  return (
    <>
      <Navbar />
      <div className="main" style={{ justifyContent: "center" }}>
        {/* show form in center */}
        <TaskForm onSubmit={handleAdd} isModal={false} />
      </div>
    </>
  )
}
