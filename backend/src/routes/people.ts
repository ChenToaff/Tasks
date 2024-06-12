import { Router } from "express";
import * as PeopleController from "../controllers/peopleController";

const router = Router();

router.get("/", PeopleController.getAllPeople);
router.get("/:id", PeopleController.getPerson);
router.post("/", PeopleController.createPerson);
router.patch("/:username", PeopleController.updatePerson);
router.delete("/:username", PeopleController.deletePerson);

export default router;
