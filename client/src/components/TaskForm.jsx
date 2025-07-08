import { useState } from "react"
import "../styles/Modal.css"

// This is a reusable task form component
// It used in two places - 
// 1) full page add task (shows normal box)
// 2) modal popup on home page (shows overlay + modal box)
// props:
// - onSubmit: function to call when form submit with {title, description, dueDate}
// - onClose: function to close modal (only used if modal)
// - isModal: true if modal, false if normal box
export default function TaskForm({ onSubmit, onClose = () => {}, isModal = false }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")

  // this function runs when form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return  // if title is empty then do nothing
    onSubmit({ title, description, dueDate })  // send data to parent
    setTitle("")          // clear form after submit
    setDescription("")
    setDueDate("")
    onClose()             // close modal if modal
  }

  // this is the main box of form
  const Box = (
    <div className={isModal ? "modal-box" : "auth-box"} style={{ background: "var(--bg)" }}>
      <h2>Add Task</h2>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="input"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div
          className={isModal ? "modal-buttons" : ""}
          style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: "flex-end" }}
        >
          {isModal && (
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          )}
          <button className="btn" style={{ background: "var(--accent)", color: "#fff" }}>
            Save
          </button>
        </div>
      </form>
    </div>
  )

  // if modal then wrap box inside overlay else just show box
  return isModal ? <div className="modal-overlay">{Box}</div> : Box
}
