import { Router } from "express";
import usersRoutes from "./userRoutes";
import tasksRoutes from "./taskRoutes";
import projectsRoutes from "./projectRoutes";
import authRoutes from "./authRoutes";
import colleaguesRoutes from "./colleagueRoutes";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.use("/auth", authRoutes);
// router.use("/users", authMiddleware, usersRoutes);
router.use("/users", usersRoutes);
router.use("/tasks", authMiddleware, tasksRoutes);
router.use("/projects", authMiddleware, projectsRoutes);
router.use("/colleagues", authMiddleware, colleaguesRoutes);

export default router;
