import { Router } from "express";
import * as UserController from "../controllers/userController";

const router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUser);
router.post("/", UserController.createUser);
router.patch("/:username", UserController.updateUser);
router.delete("/:username", UserController.deleteUser);

export default router;
