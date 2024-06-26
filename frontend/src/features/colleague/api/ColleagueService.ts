import IUser from "@interfaces/IUser";
import axios from "@lib/axiosInstance";

const API_URL = "/api/colleagues";

class ColleagueService {
  async fetchColleagues() {
    try {
      const response = await fetch(`${API_URL}`);
      if (!response.ok) throw new Error("Failed to load projects");
      return await response.json();
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }
  async addColleague(newProjectData: Partial<IUser>): Promise<IUser | null> {
    try {
      const response = await axios.post(API_URL, newProjectData);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async removeColleague(projectId: string, title: string) {
    try {
      const response = await axios.post(`${API_URL}/add-column`, {
        projectId,
        title,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getColleague(id: string): Promise<IUser | null> {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new ColleagueService();
