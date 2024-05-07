import { Router } from "express";
import * as ProjectsController from "../controllers/projectsController";

const router = Router();

router.get("/", ProjectsController.getPersonsProjects);
router.get("/:id", ProjectsController.getProjectById);
router.post("/", ProjectsController.createProject);
router.put("/:id", ProjectsController.updateProject);
router.post("/add-member", ProjectsController.addTeamMember);
router.post("/add-column", ProjectsController.addColumn);
router.post("/remove-member", ProjectsController.removeTeamMember);
router.delete("/:id", ProjectsController.deleteProject);

export default router;
