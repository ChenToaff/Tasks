import IProject from "../interfaces/IProject";
import ProjectModel from "../models/ProjectModel";
import { Schema } from "mongoose";
import { NotFoundError } from "../utils/ApiError";

export const findProjectById = async (id: string): Promise<IProject> => {
  const project = await ProjectModel.findById(id)
    .populate({ path: "taskColumns", populate: "tasks" })
    .populate("members", "name username id");
  if (!project) throw new NotFoundError("Project not found");
  return project;
};

export const createProject = async (projectData: object): Promise<IProject> => {
  const newProject = new ProjectModel(projectData);
  return await newProject.save();
};

export const addColumn = async (
  projectId: object,
  taskColumnId: String
): Promise<IProject> => {
  const project = await ProjectModel.findByIdAndUpdate<IProject>(
    projectId,
    {
      $push: taskColumnId,
    },
    { new: true }
  );
  if (!project) throw new NotFoundError("Project not found");
  return project;
};

export const updateProject = async (
  id: string,
  projectData: Partial<IProject>
): Promise<IProject> => {
  const updatedProject = await ProjectModel.findByIdAndUpdate(id, projectData, {
    new: true,
  })
    .populate("taskColumns.tasks")
    .populate("members", "name username id");
  if (!updatedProject) {
    throw new NotFoundError("Project not found");
  }
  return updatedProject;
};

export const deleteProject = async (id: string): Promise<IProject> => {
  const deletedProject = await ProjectModel.findByIdAndDelete(id);
  if (!deletedProject) throw new NotFoundError("Project not found");
  return deletedProject;
};

export const addTeamMember = async (
  projectId: string,
  memberId: string
): Promise<IProject | null> => {
  const objectId = new Schema.Types.ObjectId(memberId); // Convert string to ObjectId

  const updatedProject = await ProjectModel.findByIdAndUpdate(
    projectId,
    {
      $addToSet: { members: objectId },
    },
    { new: true, useFindAndModify: false }
  );

  return updatedProject;
};

export const removeTeamMember = async (
  projectId: string,
  memberId: string
): Promise<IProject> => {
  const project = await findProjectById(projectId);
  project.members = project.members.filter(
    (member) => member.toString() !== memberId
  );
  await project.save();
  return project;
};
