import { Router } from "express";
import * as ProjectController from "../controllers/projectController";

const router = Router();

router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getProjectById);
router.post("/", ProjectController.createProject);
router.put("/:id", ProjectController.updateProject);
router.post("/add-member", ProjectController.addTeamMember);
router.post("/add-column", ProjectController.addColumn);
router.post("/change-task-location", ProjectController.changeTaskLocation);
router.post("/remove-member", ProjectController.removeTeamMember);
router.delete("/:id", ProjectController.deleteProject);

export default router;
