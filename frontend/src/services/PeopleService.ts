import axios from "axios";
import IPerson from "@interfaces/IPerson";

const API_URL = "/api/people";

class PeopleService {
  async getAllPeople(): Promise<[IPerson] | null> {
    try {
      const response = await axios.get(`${API_URL}/`);
      return response.data;
    } catch (error) {
      console.error("Login failed", error);
      return null;
    }
  }
}

export default new PeopleService();
