import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import * as ProjectService from "../services/projectService";
import * as UserService from "../services/userService";
import * as TaskColumnService from "../services/taskColumnService";
import * as TaskService from "../services/taskService";
import { emitToUser } from "../websocket/socketManager";
import IUser from "../interfaces/IUser";

export const addColumn = asyncHandler(async (req: Request, res: Response) => {
  const { projectId, title } = req.body;

  const taskColumn = await TaskColumnService.createTaskColumn({ title });
  const project = await ProjectService.addColumn(projectId, taskColumn.id);

  res.status(200).json(project);
});

export const getAllProjects = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const start = parseInt(req.query.start as string, 10) || 0;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const projects = await UserService.getProjects(userId, start, limit);
    res.json(projects);
  }
);

// Get a single project by ID
export const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await ProjectService.findProjectById(id);
    res.json(project);
  }
);

// Create a new project
export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, members } = req.body;
    // Resolve usernames to ids
    const membersIds = await UserService.getUserIds(members);
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
      const newProject = await ProjectService.createProject({
        name,
        description,
        members: [...new Set(membersIds)],
        taskColumns: [toDoColumn, inProgressColumn, DoneColumn],
      });
      for (const userId of membersIds) {
        await UserService.addProject(userId, newProject.id);
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

    const project = await ProjectService.updateProject(id, {
      name,
      description,
      members,
    });
    res.json(project);
  }
);

// Add a team member to a project
export const addTeamMember = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId, userId } = req.body;
    await ProjectService.addTeamMember(projectId, userId);
    res.status(200).json({ message: "Team member added successfully" });
  }
);

// Remove a team member from a project
export const removeTeamMember = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId, userId } = req.body;
    const project = await ProjectService.removeTeamMember(projectId, userId);
    res.status(200).json(project);
  }
);

// Delete a project
export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const project = await ProjectService.deleteProject(id);
    res.status(204).json({ project });
  }
);

export const changeTaskLocation = asyncHandler(
  async (req: Request, res: Response) => {
    const { projectId, taskId, destColumnId, sourceColumnId, position } =
      req.body;

    const project = await ProjectService.findProjectById(projectId);
    await TaskColumnService.removeTaskfromTaskColumn(sourceColumnId, taskId);
    await TaskColumnService.addTaskToTaskColumn(destColumnId, taskId, position);

    await TaskService.updateTask(taskId, { taskColumnId: destColumnId });
    (project.members as IUser[]).forEach((member) => {
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
