import { Router } from "express";
import * as ColleaguesController from "../controllers/colleaguesController";

const router = Router();

router.get("/", ColleaguesController.getColleagues);
// router.post("/add", ColleaguesController.addColleague);
// router.post("/remove", ColleaguesController.removeColleague);

export default router;
