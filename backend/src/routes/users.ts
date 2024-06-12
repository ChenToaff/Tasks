import { Router } from "express";
import * as UsersController from "../controllers/usersController";

const router = Router();

router.get("/", UsersController.getAllUsers);
router.get("/:id", UsersController.getUser);
router.post("/", UsersController.createUser);
router.patch("/:username", UsersController.updateUser);
router.delete("/:username", UsersController.deleteUser);

export default router;
