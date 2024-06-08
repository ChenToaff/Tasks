import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import * as ColleaguesService from "../services/colleaguesService";

export const getColleagues = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!._id;
    const people = await ColleaguesService.getColleagues(userId);
    if (!people) {
      throw new ApiError(404, "Person not found");
    }
    res.json(people);
  }
);

// export const addColleague = asyncHandler(
//   async (req: Request, res: Response) => {
//     const newPerson = await ColleaguesService.addColleague(req.body);
//     res
//       .status(201)
//       .json({ message: `${newPerson.username} was created successfully.` });
//   }
// );

// export const removeColleague = asyncHandler(
//   async (req: Request, res: Response) => {
//     const { username } = req.params;
//     const updatedPerson = await ColleaguesService.removeColleague(
//       username,
//       req.body
//     );
//     if (!updatedPerson) {
//       throw new ApiError(404, "Person not found");
//     }
//     res.json(updatedPerson);
//   }
// );
