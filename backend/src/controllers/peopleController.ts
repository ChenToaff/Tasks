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

export const getPersonById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const person = await PeopleService.findPersonById(id);
    if (!person) {
      throw new ApiError(404, "Person not found");
    }
    res.json(person);
  }
);

export const createPerson = asyncHandler(
  async (req: Request, res: Response) => {
    const newPerson = await PeopleService.createPerson(req.body);
    res.status(201).json(newPerson);
  }
);

export const updatePerson = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedPerson = await PeopleService.updatePerson(id, req.body);
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
