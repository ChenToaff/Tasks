import { Router } from "express";
import peopleRoutes from "./people";
import tasksRoutes from "./tasks";
import projectsRoutes from "./projects";

const router = Router();

router.use("/people", peopleRoutes);
router.use("/tasks", tasksRoutes);
router.use("/projects", projectsRoutes);

export default router;
