import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import * as UsersService from "../services/usersService";

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UsersService.findAllUsers();
  res.json(users);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  await UsersService.findUserById(userId);
  // const user = await UsersService.getUser(userId);
  // res.json();
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const newUser = await UsersService.createUser(req.body);
  res
    .status(201)
    .json({ message: `${newUser.username} was created successfully.` });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, name } = req.params;
  const updatedUser = await UsersService.updateUser(id, {
    username,
    password,
    name,
  });

  res.json(updatedUser);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await UsersService.deleteUser(id);
  res.status(204).send();
});
