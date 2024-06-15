import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import * as ColleagueService from "../services/colleagueService";

export const getColleagues = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const users = await ColleagueService.getColleagues(userId);

    res.json(users);
  }
);

// export const addColleague = asyncHandler(
//   async (req: Request, res: Response) => {
//     const newUser = await ColleaguesService.addColleague(req.body);
//     res
//       .status(201)
//       .json({ message: `${newUser.username} was created successfully.` });
//   }
// );

// export const removeColleague = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { username } = req.params;
//     const updatedUser = await ColleaguesService.removeColleague(
//       username,
//       req.body
//     );
//     if (!updatedUser) {
//       throw new ApiError(404, "User not found");
//     }
//     res.json(updatedUser);
//   }
// );
