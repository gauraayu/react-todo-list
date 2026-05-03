import React from "react";

function Task({ tasks, onDelete, onEdit }) {
  if (!tasks || tasks.length === 0) {
    return <p className="no-tasks">No tasks yet. Add one above.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <div className="task-header">
            <h2>{task.title}</h2>
            <div className="task-actions">
              <button className="edit-button" onClick={() => onEdit(task.id)}>
                ✎
              </button>
              <button className="delete-button" onClick={() => onDelete(task.id)}>
                −
              </button>
            </div>
          </div>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Task;