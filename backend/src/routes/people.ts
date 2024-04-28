import { Router } from "express";
import * as PeopleController from "../controllers/peopleController";

const router = Router();

router.get("/", PeopleController.getAllPeople);
router.get("/:username", PeopleController.getPersonByUsername);
router.post("/", PeopleController.createPerson);
router.put("/:username", PeopleController.updatePerson);
router.delete("/:username", PeopleController.deletePerson);

export default router;
