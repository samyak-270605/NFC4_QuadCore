

import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ Named import

const TimedTask = () => {
  const [userId, setUserId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    durationMinutes: ""
  });
  const [timers, setTimers] = useState({});

  // ✅ Extract userId from token inside useEffect
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id || decoded._id); // Depending on what your token contains
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }, []);

  // Fetch tasks after userId is set
useEffect(() => {
  if (!userId) return;

  const fetchTasks = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/tasks/${userId}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  fetchTasks();
}, [userId]);



  // Create task
  const createTask = async () => {
  if (!newTask.title || !newTask.durationMinutes) {
    alert("Title and duration required");
    return;
  }

  if (!userId) {
    console.error("User ID not loaded yet.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5001/api/tasks/${userId}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include", // send cookies!
  body: JSON.stringify({ ...newTask, userId }),
});

    const createdTask = await res.json();

    // Update list directly instead of refetching
    setTasks((prev) => [...prev, createdTask]);

    setNewTask({ title: "", description: "", durationMinutes: "" });
  } catch (err) {
    console.error("Error creating task:", err);
  }
};


  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5001/api/tasks/${id}`, { method: "DELETE" });

    // Refetch tasks
    const taskRes = await fetch(`http://localhost:5001/api/tasks/${userId}`);
    const data = await taskRes.json();
    setTasks(data);
  };

  // Start timer
  const startTimer = (id, duration) => {
    if (timers[id]) return;

    const endTime = Date.now() + duration * 60000;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimers((prev) => ({ ...prev, [id]: remaining }));
      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    setTimers((prev) => ({ ...prev, [id]: duration * 60 }));
  };

  return (
    <div className="p-6 bg-white rounded shadow w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Timed Task List</h2>

      <div className="space-y-2 mb-4">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={newTask.durationMinutes}
          onChange={(e) =>
            setNewTask({ ...newTask, durationMinutes: e.target.value })
          }
          className="border p-2 w-full"
        />
        <button
          onClick={createTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task._id} className="border p-3 rounded flex flex-col">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
              </div>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              {timers[task._id] ? (
                <span className="text-green-600 font-mono">
                  {Math.floor(timers[task._id] / 60)
                    .toString()
                    .padStart(2, "0")}
                  :
                  {(timers[task._id] % 60).toString().padStart(2, "0")}
                </span>
              ) : (
                <button
                  onClick={() =>
                    startTimer(task._id, task.durationMinutes)
                  }
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  Start Timer
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimedTask;
