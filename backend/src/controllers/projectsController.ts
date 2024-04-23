import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import * as ProjectsService from "../services/projectsService";
import IProject from "../interfaces/IProject";

// Get all projects
export const getAllProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const projects = await ProjectsService.findAllProjects();
    res.json(projects);
  }
);

// Get a single project by ID
export const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await ProjectsService.findProjectById(id);
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.json(project);
  }
);

// Create a new project
export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, manager, teamMembers } = req.body;
    try {
      const newProject = await ProjectsService.createProject({
        name,
        description,
        manager,
        teamMembers,
      } as IProject);
      res.status(201).json(newProject);
    } catch (error) {
      throw new ApiError(400, "Bad Request");
    }
  }
);

// Update an existing project
export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, manager, teamMembers } = req.body;
    try {
      const project = await ProjectsService.updateProject(id, {
        name,
        description,
        manager,
        teamMembers,
      });

      if (!project) {
        throw new ApiError(404, "Project not found");
      }
      res.json(project);
    } catch (error) {
      throw new ApiError(400, "Bad Request");
    }
  }
);

// Add a team member to a project
export const addTeamMember = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId, personId } = req.body;
    const project = await ProjectsService.findProjectById(projectId);
    if (!project) {
      throw new ApiError(400, "Project not found or member already added");
    }
    res.status(200).json(project);
  }
);

// Remove a team member from a project
export const removeTeamMember = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId, personId } = req.body;
    const project = await ProjectsService.removeTeamMember(projectId, personId);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    res.status(200).json(project);
  }
);

// Delete a project
export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await ProjectsService.deleteProject(id);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    res.status(204).send();
  }
);
