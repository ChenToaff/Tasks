import { Router } from "express";
import usersRoutes from "./users";
import tasksRoutes from "./tasks";
import projectsRoutes from "./projects";
import authRoutes from "./auth";
import colleaguesRoutes from "./colleagues";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.use("/auth", authRoutes);
// router.use("/users", authMiddleware, usersRoutes);
router.use("/users", usersRoutes);
router.use("/tasks", authMiddleware, tasksRoutes);
router.use("/projects", authMiddleware, projectsRoutes);
router.use("/colleagues", authMiddleware, colleaguesRoutes);

export default router;
