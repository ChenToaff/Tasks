import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import * as ProjectsService from "../services/projectsService";
import * as PeopleService from "../services/peopleService";
import * as TaskColumnService from "../services/taskColumnService";
import * as TasksService from "../services/tasksService";
import { emitToUser } from "../websocket/socketManager";
import IPerson from "../interfaces/IPerson";

export const addColumn = asyncHandler(async (req: Request, res: Response) => {
  const { projectId, title } = req.body;
  const project = await ProjectsService.addColumn(projectId, title);
  if (!project) {
    throw new ApiError(400, "Project not found or member already added");
  }
  res.status(200).json(project);
});

export const getAllProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const start = parseInt(req.query.start as string, 10) || 0;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const projects = await PeopleService.getProjects(userId, start, limit);
    if (!projects) {
      throw new ApiError(404, "Person not found");
    }
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
    const { name, description, members } = req.body;
    // Resolve usernames to _ids for manager
    const membersIds = await PeopleService.getUserIds(members);
    membersIds.push(req.user!._id);
    try {
      const toDoColumn = await TaskColumnService.createTaskColumn({
        title: "To Do",
      });
      const inProgressColumn = await TaskColumnService.createTaskColumn({
        title: "In Progress",
      });
      const DoneColumn = await TaskColumnService.createTaskColumn({
        title: "Done",
      });
      const newProject = await ProjectsService.createProject({
        name,
        description,
        members: [...new Set(membersIds)],
        taskColumns: [toDoColumn, inProgressColumn, DoneColumn],
      });
      for (const personId of membersIds) {
        await PeopleService.addProject(personId, newProject.id);
      }

      res.status(201).json(newProject);
    } catch (error) {
      console.log(error);
      throw new ApiError(400, "Bad Request");
    }
  }
);

// Update an existing project
export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, members } = req.body;

    try {
      const project = await ProjectsService.updateProject(id, {
        name,
        description,
        members,
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

export const changeTaskLocation = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId, taskId, destColumnId, sourceColumnId, position } =
      req.body;

    const project = await ProjectsService.findProjectById(projectId);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    await ProjectsService.changeTaskLocation(
      projectId,
      taskId,
      sourceColumnId,
      destColumnId,
      position
    );

    await TasksService.updateTask(taskId, { taskColumnId: destColumnId });
    (project.members as IPerson[]).forEach((member) => {
      emitToUser(member.id.toString(), "task_location_changed", {
        message: `Task location changed`,
        changeData: {
          projectId,
          taskId,
          destColumnId,
          sourceColumnId,
          position,
        },
      });
    });
    res.status(200).send();
  }
);
