import { useEffect, useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  parseISO,
} from "date-fns";

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

const Calendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState({ title: "", time: "", status: "not_done" });
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Load from local storage
  useEffect(() => {
  const stored = localStorage.getItem("events");
  if (stored) {
    const parsed = JSON.parse(stored).map((event) => ({
      ...event,
      date: new Date(event.date).toDateString() // normalize after rehydration
    }));
    setEvents(parsed);
  }
}, []);
  // Save to local storage
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const startWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startWeek, i));

  const nextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));
  const prevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));

  const openModal = (day, time) => {
    setSelectedDate(day);
    const existingIndex = events.findIndex(
      (e) => e.date === day.toDateString() && e.time === time
    );
    if (existingIndex !== -1) {
      setNewEvent(events[existingIndex]);
      setEditingIndex(existingIndex);
    } else {
      setNewEvent({ title: "", time, status: "not_done", date: day.toDateString() });
      setEditingIndex(null);
    }
    setShowModal(true);
  };

  const handleSave = () => {
  if (!newEvent.title || !newEvent.time) return;
  const updated = [...events];

  const normalizedEvent = {
    ...newEvent,
    date: new Date(selectedDate).toDateString(), // normalize
  };

  if (editingIndex !== null) {
    updated[editingIndex] = normalizedEvent;
  } else {
    updated.push(normalizedEvent);
  }
  setEvents(updated);
  setShowModal(false);
  resetForm();
};


  const handleDelete = () => {
    if (editingIndex !== null) {
      const updated = [...events];
      updated.splice(editingIndex, 1);
      setEvents(updated);
    }
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNewEvent({ title: "", time: "", status: "not_done" });
    setEditingIndex(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-600";
      case "partial":
        return "bg-yellow-500";
      default:
        return "bg-red-600";
    }
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white text-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-medium">
          {format(currentWeek, "MMMM yyyy")} — Week View
        </div>
        <div className="flex gap-1 items-center">
          <input
            type="date"
            className="border border-gray-700 bg-gray-800 text-white px-2 py-1 rounded text-sm"
            onChange={(e) => setCurrentWeek(parseISO(e.target.value))}
          />
          <button
            onClick={prevWeek}
            className="px-3 py-1 bg-gray-700 text-white rounded shadow hover:bg-gray-600 text-sm"
          >
            ◀ Prev
          </button>
          <button
            onClick={nextWeek}
            className="px-3 py-1 bg-gray-700 text-white rounded shadow hover:bg-gray-600 text-sm"
          >
            Next ▶
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[60px_repeat(7,minmax(0,1fr))] border-t border-l border-gray-700">
        <div className="bg-gray-800 h-10"></div>
        {weekDays.map((day, idx) => (
          <div
            key={idx}
            className="bg-gray-800 text-center border-r border-b border-gray-700 p-1 font-medium text-xs"
          >
            {format(day, "EEE dd")}
          </div>
        ))}

        {hours.map((hour, hIdx) => (
          <>
            <div
              key={`time-${hIdx}`}
              className="bg-gray-800 text-[10px] text-gray-400 border-r border-b border-gray-700 p-1 text-right"
            >
              {hour}
            </div>
            {weekDays.map((day, dIdx) => {
              const dateStr = day.toDateString();
              const hourStr = hour;
              const dayEvents = events.filter(
                (e) => e.date === dateStr && e.time === hourStr
              );
              return (
                <div
                  key={`cell-${hIdx}-${dIdx}`}
                  className="h-14 bg-gray-800 border-r border-b border-gray-700 hover:bg-gray-700 cursor-pointer relative"
                  onClick={() => openModal(day, hour)}
                >
                  {dayEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className={`absolute top-1 left-1 right-1 ${getStatusColor(event.status)} text-[10px] rounded px-1 text-white truncate`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-10">
          <div className="bg-gray-800 p-4 rounded shadow-md w-80 border border-gray-700 text-sm">
            <h2 className="text-base font-semibold mb-2 text-white">
              {editingIndex !== null ? "Edit Event" : "Add Event"}
            </h2>
            <p className="text-xs mb-2 text-gray-300">
              {format(selectedDate, "EEEE, MMM d")} at {newEvent.time}
            </p>
            <input
              type="text"
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full border border-gray-600 bg-gray-900 text-white p-2 mb-3 rounded text-sm"
            />
            <select
              value={newEvent.status}
              onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
              className="w-full border border-gray-600 bg-gray-900 text-white p-2 mb-3 rounded text-sm"
            >
              <option value="not_done">Not Done</option>
              <option value="partial">Partial</option>
              <option value="completed">Completed</option>
            </select>
            <div className="flex justify-end gap-2">
              {editingIndex !== null && (
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
