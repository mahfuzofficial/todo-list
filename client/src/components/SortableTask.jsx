import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export default function SortableTask({
  task,
  token,
  editId,
  editText,
  editDesc,
  editDue,
  setEditId,
  setEditText,
  setEditDesc,
  setEditDue,
  onToggle,
  onDelete,
  onSave,
}) {
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
        onClick={onToggle}
      >
        ✔
      </div>

      <div className="task-info">
        {editId === task._id ? (
          <div className="edit-fields">
            <input
              className="input"
              placeholder="Title"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <textarea
              className="input"
              placeholder="Description"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />
            <input
              className="input"
              type="date"
              value={editDue}
              onChange={(e) => setEditDue(e.target.value)}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button className="edit-btn" onClick={() => onSave(task._id)}>
                ✅ Save
              </button>
              <button className="edit-btn" onClick={() => setEditId(null)}>
                ❌ Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="title">{task.title}</p>
            <p className="meta">
              {task.description && <span>{task.description} • </span>}
              {task.dueDate
                ? new Date(task.dueDate).toDateString()
                : "Due Today"}
            </p>
          </>
        )}
      </div>

      <button
        className="edit-btn"
        title="Edit"
        onClick={() => {
          setEditId(task._id)
          setEditText(task.title)
          setEditDesc(task.description || "")
          setEditDue(task.dueDate?.slice(0, 10) || "")
        }}
      >
        ✏️
      </button>

      <button className="delete-btn" title="Delete" onClick={onDelete}>
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 3v1H4v2h16V4h-5V3h-6zm-2 5v12c0 .6.4 1 1 1h8c.6 0 1-.4 1-1V8H7z" />
        </svg>
      </button>
    </div>
  )
}
