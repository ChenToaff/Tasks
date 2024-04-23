import { Router } from "express";
import * as PeopleController from "../controllers/peopleController";

const router = Router();

router.get("/", PeopleController.getAllPeople);
router.get("/:id", PeopleController.getPersonById);
router.post("/", PeopleController.createPerson);
router.put("/:id", PeopleController.updatePerson);
router.delete("/:id", PeopleController.deletePerson);

export default router;
