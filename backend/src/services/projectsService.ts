import IProject from "../interfaces/IProject";
import ProjectModel from "../models/ProjectsModel";
import { Schema } from "mongoose";

export const findAllProjects = async (): Promise<IProject[]> => {
  return await ProjectModel.find()
    .populate("tasks")
    .populate("manager")
    .populate("teamMembers");
};

export const findProjectById = async (id: string): Promise<IProject | null> => {
  return await ProjectModel.findById(id)
    .populate("tasks")
    .populate("manager")
    .populate("teamMembers");
};

export const createProject = async (
  projectData: IProject
): Promise<IProject> => {
  const newProject = new ProjectModel(projectData);
  return await newProject.save();
};

export const updateProject = async (
  id: string,
  projectData: Partial<IProject>
): Promise<IProject | null> => {
  return await ProjectModel.findByIdAndUpdate(id, projectData, { new: true })
    .populate("tasks")
    .populate("manager")
    .populate("teamMembers");
};

export const deleteProject = async (id: string): Promise<IProject | null> => {
  return await ProjectModel.findByIdAndDelete(id);
};

export const addTeamMember = async (
  projectId: string,
  memberId: string
): Promise<IProject | null> => {
  const objectId = new Schema.Types.ObjectId(memberId); // Convert string to ObjectId
  const project = await ProjectModel.findById(projectId);
  if (project && !project.teamMembers.includes(objectId)) {
    project.teamMembers.push(objectId);
    return await project.save();
  }
  return null;
};

export const removeTeamMember = async (
  projectId: string,
  memberId: string
): Promise<IProject | null> => {
  const project = await ProjectModel.findById(projectId);
  if (project) {
    project.teamMembers = project.teamMembers.filter(
      (member) => member.toString() !== memberId
    );
    return await project.save();
  }
  return null;
};
