import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getTasks,deleteTask,createTask } from "../controllers/task.controller.js";

const router = express.Router();

// Apply auth middleware to all task routes
// router.use(protectRoute);

// Task routes
router.post("/:userId",protectRoute, createTask);
router.get("/:userId", getTasks);
// router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
