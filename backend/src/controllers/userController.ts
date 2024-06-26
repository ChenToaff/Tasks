import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import * as UserService from "../services/userService";
import { ValidationError } from "../utils/ApiError";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserService.findAllUsers();
  res.json(users);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  await UserService.findUserById(userId);
  // const user = await UsersService.getUser(userId);
  // res.json();
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name) {
    throw new ValidationError(
      "The request is missing one or more required fields: username, password, name."
    );
  }
  const userExists = await UserService.findUserByUsername(username);
  if (userExists) throw new ValidationError("Username already taken.");
  const newUser = await UserService.createUser(req.body);
  res
    .status(201)
    .json({ message: `${newUser.username} was created successfully.` });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, name } = req.params;
  const updatedUser = await UserService.updateUser(id, {
    username,
    password,
    name,
  });

  res.json(updatedUser);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await UserService.deleteUser(id);
  res.status(204).send();
});
