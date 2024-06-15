import { Router } from "express";
import * as ColleagueController from "../controllers/colleagueController";

const router = Router();

router.get("/", ColleagueController.getColleagues);
// router.post("/add", ColleaguesController.addColleague);
// router.post("/remove", ColleaguesController.removeColleague);

export default router;
