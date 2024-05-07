import IProject from "../interfaces/IProject";
import ITask from "../interfaces/ITask";
import ProjectModel from "../models/ProjectsModel";
import { Schema, Types } from "mongoose";

export const findAllProjects = async (): Promise<IProject[]> => {
  return await ProjectModel.find()
    .populate("taskColumns.tasks")
    .populate("members");
};

export const findProjectById = async (id: string): Promise<IProject | null> => {
  return await ProjectModel.findById(id)
    .populate("taskColumns.tasks")
    .populate("members");
};

export const createProject = async (projectData: object): Promise<IProject> => {
  const newProject = new ProjectModel(projectData);
  return await newProject.save();
};

export const addColumn = async (
  projectId: object,
  title: String
): Promise<IProject> => {
  const project = await ProjectModel.findByIdAndUpdate<IProject>(
    projectId,
    {
      $push: { taskColumns: { title, tasks: [] } },
    },
    { new: true }
  );
  if (!project) throw new Error("No Such Project");
  return project;
};

export const updateProject = async (
  id: string,
  projectData: Partial<IProject>
): Promise<IProject | null> => {
  return await ProjectModel.findByIdAndUpdate(id, projectData, { new: true })
    .populate("taskColumns.tasks")
    .populate("members");
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
  if (project && !project.members.includes(objectId)) {
    project.members.push(objectId);
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
    project.members = project.members.filter(
      (member) => member.toString() !== memberId
    );
    return await project.save();
  }
  return null;
};

export const addTaskToTaskColumn = async (
  projectId: string,
  taskColumnId: string,
  taskId: Types.ObjectId
) => {
  const project = await findProjectById(projectId);
  if (!project) throw Error("Project not found!");
  const taskColumn = project.taskColumns.id(taskColumnId);
  if (!taskColumn) throw new Error("Task column not found");

  taskColumn.tasks.unshift(taskId);
  await project.save();
  return project;
};

export const changeTaskLocation = async (
  projectId: string,
  taskId: string,
  sourceTaskColumnId: string,
  destTaskColumnId: string,
  sourceIndex: number,
  destIndex: number
) => {
  const project = await findProjectById(projectId);
  if (!project) throw new Error("Project not found");

  // Extract the task from the source column
  const sourceColumn = project.taskColumns.id(sourceTaskColumnId);
  if (
    !sourceColumn ||
    sourceIndex >= sourceColumn.tasks.length ||
    sourceIndex < 0
  ) {
    throw new Error("Source task column not found or index out of range");
  }
  // Verify the task to be moved
  const movingTaskId = sourceColumn.tasks[sourceIndex];
  if (!movingTaskId.equals(taskId)) {
    throw new Error(
      "Task ID does not match the provided task ID for move operation"
    );
  }
  const [task] = sourceColumn.tasks.splice(sourceIndex, 1); // Remove task from source

  // Insert the task into the destination column
  const destColumn = project.taskColumns.id(destTaskColumnId);
  if (!destColumn || destIndex > destColumn.tasks.length || destIndex < 0) {
    throw new Error("Destination task column not found or index out of range");
  }
  destColumn.tasks.splice(destIndex, 0, task);

  // Save the updated project
  await project.save();
};

// export const updateProjectTasks = async (projectId: string, updatedTasks : ITask[]) => {
//   try {
//     const project = await ProjectModel.findById(projectId)
//     if (project) {
//       project.tasks = updatedTasks;
//       await project.save();
//     }
//   } catch (error) {
//     if (error.name === 'VersionError') {
//       // Fetch the current state of the document
//       const currentProject = await Project.findById(projectId);

//       // Inform the user of the conflict and potentially merge
//       console.error('Conflict detected. Your changes were based on an outdated version.');
//       // Optionally, send back both versions to the user for a manual merge
//       return { error: 'Conflict detected', yourChanges: updatedTasks, currentVersion: currentProject };
//     } else {
//       console.error('An error occurred:', error);
//     }
//   }
// }
