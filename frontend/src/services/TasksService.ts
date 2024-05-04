import ITask from "@interfaces/ITask";
import axios from "axios";

const API_URL = "/api/tasks";

class TasksService {
  async createTask(
    newTaskData: Partial<ITask>,
    projectId: string,
    taskColumnId: string
  ): Promise<ITask | null> {
    try {
      const response = await axios.post(API_URL, {
        taskData: newTaskData,
        projectId,
        taskColumnId,
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
