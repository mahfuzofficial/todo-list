import { useEffect, useState, useCallback } from "react"
import Navbar from "../components/Navbar"
import {
  getTasks,
  addTask,
  toggleComplete,
  deleteTask,
} from "../api/tasksApi"
import TaskForm from "../components/TaskForm"

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"

export default function Home() {
  const token = localStorage.getItem("token")
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("all")
  const [showForm, setShowForm] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  )
  
  // Local date string to avoid timezone bugs
  const [todayStr, setTodayStr] = useState(() =>
    new Date().toLocaleDateString("en-CA")
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const localDate = new Date().toLocaleDateString("en-CA")
      setTodayStr(localDate)
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const fetchTasks = useCallback(() => {
    getTasks(token).then((data) => {
      if (Array.isArray(data)) {
        setTasks(data)
      } else {
        window.location.href = "/login"
      }
    })
  }, [token])

  useEffect(() => {
    if (!token) {
      window.location.href = "/login"
    } else {
      fetchTasks()
    }
  }, [token, fetchTasks])

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((t) => t._id === active.id)
      const newIndex = tasks.findIndex((t) => t._id === over?.id)
      const updated = arrayMove(tasks, oldIndex, newIndex)
      setTasks(updated)
    }
  }

  // Sidebar counts
  const totalCount = tasks.length
  const completedCount = tasks.filter((t) => t.completed).length
  const pendingCount = tasks.filter((t) => !t.completed).length

  // Filter logic based on sidebar
  const filtered = tasks.filter((t) => {
    if (filter === "completed") return t.completed
    if (filter === "pending") return !t.completed
    if (filter === "all")
      return !(t.completed && t.dueDate?.slice(0, 10) < todayStr)
    return true
  })

  // Date-based sections
  const overdue = filtered.filter(
    (t) => t.dueDate?.slice(0, 10) < todayStr
  )
  const today = filtered.filter(
    (t) => t.dueDate?.slice(0, 10) === todayStr
  )
  const upcoming = filtered.filter(
    (t) => t.dueDate?.slice(0, 10) > todayStr
  )
  const noDate = filtered.filter((t) => !t.dueDate)

  // Task component
  const SortableTask = ({ task }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({ id: task._id })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    }

    const [editMode, setEditMode] = useState(false)
    const [editText, setEditText] = useState(task.title)
    const [editDesc, setEditDesc] = useState(task.description || "")
    const [editDue, setEditDue] = useState(task.dueDate?.slice(0, 10) || "")

    const handleEditSave = async () => {
      if (!editText.trim()) return alert("Title is required")

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${task._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editText,
            description: editDesc,
            dueDate: editDue,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          return alert("Error: " + (data.message || "Could not update task"))
        }

        setEditMode(false)
        fetchTasks()
      } catch (err) {
        alert("Network problem or server error")
      }
    }

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`task ${task.completed ? "done" : ""}`}
      >
        <div className="drag-handle" {...attributes} {...listeners}>☰</div>

        <div
          className={`drag-complete ${task.completed ? "checked" : ""}`}
          title="Toggle Complete"
          onClick={() => toggleComplete(token, task._id).then(fetchTasks)}
        >
          ✔
        </div>

        <div className="task-info">
          {editMode ? (
            <div className="edit-fields">
              <input
                className="input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Title"
              />
              <textarea
                className="input"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Description"
              />
              <input
                className="input"
                type="date"
                value={editDue}
                onChange={(e) => setEditDue(e.target.value)}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <button className="edit-btn" onClick={handleEditSave}>✅ Save</button>
                <button className="edit-btn" onClick={() => setEditMode(false)}>❌ Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <p className="title">{task.title}</p>
              <p className="meta">
                {task.description && <span>{task.description} • </span>}
                {task.dueDate
                  ? new Date(task.dueDate).toDateString()
                  : "No Due Date"}
              </p>
            </>
          )}
        </div>

        {!editMode && (
          <>
            <button
              className="edit-btn"
              title="Edit"
              onClick={() => {
                setEditMode(true)
                setEditText(task.title)
                setEditDesc(task.description || "")
                setEditDue(task.dueDate?.slice(0, 10) || "")
              }}
            >
              ✏️
            </button>

            <button
              className="delete-btn"
              title="Delete"
              onClick={() => {
                if (window.confirm("Sure to delete this task?")) {
                  deleteTask(token, task._id).then(fetchTasks)
                }
              }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 3v1H4v2h16V4h-5V3h-6zm-2 5v12c0 .6.4 1 1 1h8c.6 0 1-.4 1-1V8H7z" />
              </svg>
            </button>
          </>
        )}
      </div>
    )
  }

  const renderSection = (title, tasks) => {
    if (!tasks.length) return null
    return (
      <>
        <p className="section-title">{title}</p>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext items={tasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
            {tasks.map(t => <SortableTask key={t._id} task={t} />)}
          </SortableContext>
        </DndContext>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="main">
        <div className="side">
          <div onClick={() => setFilter("all")} className={`filter ${filter === "all" ? "active" : ""}`}>
            📂 <span>All ({totalCount})</span>
          </div>
          <div onClick={() => setFilter("completed")} className={`filter ${filter === "completed" ? "active" : ""}`}>
            ✅ <span>Completed ({completedCount})</span>
          </div>
          <div onClick={() => setFilter("pending")} className={`filter ${filter === "pending" ? "active" : ""}`}>
            🕒 <span>Pending ({pendingCount})</span>
          </div>
        </div>

        <div className="content">
          <div className="head">
            <h1>{filter === "all" ? "All" : filter === "completed" ? "Completed" : "Pending"}</h1>
            <p>
              {filter === "all"
                ? "All your tasks in one place"
                : filter === "completed"
                ? "Tasks you finished"
                : "Tasks that are overdue and still pending"}
            </p>
          </div>

          <div className="add-row" onClick={() => setShowForm(true)}>
            <input className="input" placeholder="Add a task..." readOnly style={{ cursor: "pointer" }} />
          </div>

          {renderSection("Overdue", overdue)}
          {renderSection("Today", today)}
          {renderSection("Upcoming", upcoming)}
          {renderSection("No Due Date", noDate)}
        </div>
      </div>

      {showForm && (
        <TaskForm
          isModal={true}
          onClose={() => setShowForm(false)}
          onSubmit={({ title, description, dueDate }) =>
            addTask(token, { title, description, dueDate }).then(() => {
              fetchTasks()
              setShowForm(false)
            })
          }
        />
      )}
    </>
  )
}
