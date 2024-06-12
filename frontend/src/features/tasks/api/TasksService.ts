import ITask from "@interfaces/ITask";
import axios from "axios";
const API_URL = "/api/tasks";

class TasksService {
  async getTasks(): Promise<ITask[]> {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }
  async createTask(newTaskData: Partial<ITask>): Promise<ITask | null> {
    try {
      const response = await axios.post(API_URL, newTaskData);
      return response.data.task;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateTask(taskId: string, update: Partial<ITask>) {
    try {
      const response = await axios.patch(`${API_URL}/${taskId}`, update);
      return response.data.task;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteTask(taskId: string) {
    try {
      const response = await axios.delete(`${API_URL}/${taskId}`);
      return response.data.task;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async assignTask(taskId: string, assignedTo: string | null) {
    try {
      const response = await axios.patch(`${API_URL}/${taskId}`, {
        assignedTo,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getTask(id: string): Promise<ITask | null> {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new TasksService();
