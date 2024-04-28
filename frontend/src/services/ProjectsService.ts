import IProject from "@interfaces/IProject";
import axios from "axios";

const API_URL = "/api/projects";

class ProjectsService {
  async createProject(
    newProjectData: Partial<IProject>
  ): Promise<IProject | null> {
    try {
      const response = await axios.post(API_URL, newProjectData);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getProject(id: string): Promise<IProject | null> {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new ProjectsService();
