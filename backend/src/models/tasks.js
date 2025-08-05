import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  durationMinutes: Number, // how long the timer is scheduled
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;