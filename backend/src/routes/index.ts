import { Router } from "express";
import peopleRoutes from "./people";
import tasksRoutes from "./tasks";
import projectsRoutes from "./projects";
import authRoutes from "./auth";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.use("/auth", authRoutes);
// router.use("/people", authMiddleware, peopleRoutes);
router.use("/people", peopleRoutes);
router.use("/tasks", authMiddleware, tasksRoutes);
router.use("/projects", authMiddleware, projectsRoutes);

export default router;
