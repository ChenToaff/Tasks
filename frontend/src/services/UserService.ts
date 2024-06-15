import axios from "axios";
import IUser from "@interfaces/IUser";

const API_URL = "/api/users";

class UserService {
  async getAllUsers(): Promise<[IUser] | null> {
    try {
      const response = await axios.get(`${API_URL}/`);
      return response.data;
    } catch (error) {
      console.error("Login failed", error);
      return null;
    }
  }
}

export default new UserService();
