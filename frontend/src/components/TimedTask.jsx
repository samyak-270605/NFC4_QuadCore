import { useState } from "react";

const App = () => {
  const [task, setTask] = useState({ title: "", details: "", time: "" });
  const [tasks, setTasks] = useState([]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const addTask = () => {
    if (!task.title || !task.details || !task.time) return;
    setTasks([
      ...tasks,
      { ...task, timeLeft: task.time * 60, timerRunning: false, intervalId: null },
    ]);
    setTask({ title: "", details: "", time: "" });
  };

  const startTimer = (index) => {
    const updatedTasks = [...tasks];
    const current = updatedTasks[index];
    if (current.timerRunning || current.timeLeft <= 0) return;

    current.timerRunning = true;
    current.intervalId = setInterval(() => {
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        if (newTasks[index].timeLeft <= 1) {
          clearInterval(newTasks[index].intervalId);
          newTasks[index].timerRunning = false;
          alert(`Timer ended for: ${newTasks[index].title}`);
        }
        newTasks[index].timeLeft -= 1;
        return [...newTasks];
      });
    }, 1000);

    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    if (updatedTasks[index].intervalId) {
      clearInterval(updatedTasks[index].intervalId);
    }
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-4 py-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-6 px-2 md:px-0">
        <h1 className="text-3xl font-bold text-center">🕒 Timed Task Tracker</h1>

        <div className="bg-zinc-800 p-4 rounded-lg shadow space-y-3">
          <input
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Task Title"
            className="w-full p-2 bg-zinc-700 text-white rounded placeholder:text-gray-400 text-sm"
          />
          <input
            name="details"
            value={task.details}
            onChange={handleChange}
            placeholder="Task Details"
            className="w-full p-2 bg-zinc-700 text-white rounded placeholder:text-gray-400 text-sm"
          />
          <input
            name="time"
            type="number"
            value={task.time}
            onChange={handleChange}
            placeholder="Time (minutes)"
            className="w-full p-2 bg-zinc-700 text-white rounded placeholder:text-gray-400 text-sm"
          />
          <button
            onClick={addTask}
            className="w-full bg-blue-600 hover:bg-blue-700 transition px-3 py-2 rounded text-sm"
          >
            ➕ Add Task
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {tasks.map((t, i) => (
            <div key={i} className="bg-zinc-800 rounded p-4 shadow flex justify-between items-start">
              <div className="flex-1 pr-2">
                <h2 className="font-semibold text-lg">{t.title}</h2>
                <p className="text-sm text-gray-300">{t.details}</p>
                <p className="mt-1 text-sm text-green-400">⏳ {formatTime(t.timeLeft)}</p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <button
                  onClick={() => startTimer(i)}
                  className="bg-green-600 hover:bg-green-700 text-sm px-3 py-1 rounded"
                >
                  Start
                </button>
                <button
                  onClick={() => deleteTask(i)}
                  className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
