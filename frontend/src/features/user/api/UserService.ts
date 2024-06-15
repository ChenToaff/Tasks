import SignupData from "@customTypes/SignupData";
import IUser from "@interfaces/IUser";
import axios from "axios";

const API_URL = "/api/users";

class UserService {
  async signup(signupData: SignupData) {
    await axios.post(`${API_URL}/`, signupData);
  }
  async getAllUsers(): Promise<IUser[] | null> {
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
