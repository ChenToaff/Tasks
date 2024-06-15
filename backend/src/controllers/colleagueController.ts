import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import * as ColleagueService from "../services/colleagueService";
import * as UserService from "../services/userService";

export const getColleagues = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const users = await ColleagueService.getColleagues(userId);

    res.json(users);
  }
);

export const addColleague = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const { colleagueId } = req.body;
    await UserService.findUserById(colleagueId);
    await ColleagueService.addColleague(userId, colleagueId);
    await ColleagueService.addColleague(colleagueId, userId);
    res.status(200).json({ message: `The colleague was added.` });
  }
);

export const removeColleague = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const { colleagueId } = req.body;
    await UserService.findUserById(colleagueId);
    await ColleagueService.removeColleague(userId, colleagueId);
    await ColleagueService.removeColleague(colleagueId, userId);

    res.status(200).json({ message: `The colleague was removed.` });
  }
);
