import React, { useEffect, useState } from "react";

import Task from "./Task";

    
   
    
    
const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (error) {
        console.error("Error parsing saved tasks:", error);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("tasks state:", tasks);
    console.log("localStorage tasks:", localStorage.getItem("tasks"));
  }, [tasks]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() && !description.trim()) return;

    if (editingTaskId) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId
          ? {
              ...task,
              title: title.trim() || "Untitled Task",
              description: description.trim() || "No description",
            }
          : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setEditingTaskId(null);
    } else {
      const newTask = {
        id: Date.now(),
        title: title.trim() || "Untitled Task",
        description: description.trim() || "No description",
      };
      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    setTitle("");
    setDescription("");
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    if (editingTaskId === taskId) {
      setEditingTaskId(null);
      setTitle("");
      setDescription("");
    }
  };

  const handleEdit = (taskId) => {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;
    setTitle(task.title);
    setDescription(task.description);
    setEditingTaskId(taskId);
  };

  return (
    <div className="container">
      <h1>DAILY GOALS</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button type="submit">{editingTaskId ? "UPDATE" : "ADD"}</button>
      </form>
      <Task tasks={tasks} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default Home;
