import { Router } from "express";
import * as PeopleController from "../controllers/peopleController";

const router = Router();

router.get("/", PeopleController.getAllPeople);
// router.get("/:id/projects", PeopleController.getPersonsProjects);
router.get("/:id/colleagues", PeopleController.getPersonsColleagues);
router.get("/:id/tasks", PeopleController.getPersonsTasks);
router.post("/", PeopleController.createPerson);
router.put("/:username", PeopleController.updatePerson);
router.delete("/:username", PeopleController.deletePerson);

export default router;
