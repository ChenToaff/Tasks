import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import * as PeopleService from "../services/peopleService";

export const getAllPeople = asyncHandler(
  async (req: Request, res: Response) => {
    const people = await PeopleService.findAllPeople();
    res.json(people);
  }
);

export const getPersonsTasks = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const start = parseInt(req.query.start as string, 10) || 0;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const tasks = await PeopleService.getTasks(userId, start, limit);
    if (!tasks) {
      throw new ApiError(404, "Person not found");
    }
    res.json(tasks);
  }
);

export const getPersonsColleagues = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const people = await PeopleService.getColleagues(userId);
    if (!people) {
      throw new ApiError(404, "Person not found");
    }
    res.json(people);
  }
);

export const createPerson = asyncHandler(
  async (req: Request, res: Response) => {
    const newPerson = await PeopleService.createPerson(req.body);
    res
      .status(201)
      .json({ message: `${newPerson.username} was created successfully.` });
  }
);

export const updatePerson = asyncHandler(
  async (req: Request, res: Response) => {
    const { username } = req.params;
    const updatedPerson = await PeopleService.updatePerson(username, req.body);
    if (!updatedPerson) {
      throw new ApiError(404, "Person not found");
    }
    res.json(updatedPerson);
  }
);

export const deletePerson = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedPerson = await PeopleService.deletePerson(id);
    if (!deletedPerson) {
      throw new ApiError(404, "Person not found");
    }
    res.status(204).send();
  }
);
