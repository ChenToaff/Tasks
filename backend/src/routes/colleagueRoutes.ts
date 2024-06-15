import { Router } from "express";
import * as ColleagueController from "../controllers/colleagueController";

const router = Router();

router.get("/", ColleagueController.getColleagues);
router.post("/add", ColleagueController.addColleague);
router.post("/remove", ColleagueController.removeColleague);

export default router;
