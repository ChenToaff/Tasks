import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/status", authController.checkStatus);

export default router;
