import { Router } from "express";
import * as TasksController from "../controllers/tasksController";

const router = Router();

router.get("/", TasksController.getAllTasks);
router.get("/:id", TasksController.getTaskById);
router.post("/", TasksController.createTask);
router.put("/:id", TasksController.updateTask);
router.delete("/:id", TasksController.deleteTask);
router.patch("/:id/completed", TasksController.updateTaskCompleted);

export default router;
