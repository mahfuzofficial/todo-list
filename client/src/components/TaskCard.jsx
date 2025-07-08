export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={`task ${task.completed ? "done" : ""}`}>
      <div>
        {/* task name */}
        <p className="title">{task.title}</p>

        {/* if desc given then show */}
        {task.description && <p className="desc">{task.description}</p>}

        {/* due date if given */}
        {task.dueDate && (
          <p className="due">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* buttons */}
      <div className="actions">
        <button onClick={onToggle} title="Toggle Complete">
          {task.completed ? "↺" : "✔"}
        </button>

        <button onClick={onDelete} title="Delete">
          🗑
        </button>
      </div>
    </div>
  )
}
