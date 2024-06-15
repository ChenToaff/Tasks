import IUser from "@interfaces/IUser";
import axios from "axios";

const API_URL = "/api/auth";

export interface Credentials {
  username: string;
  password: string;
}

class AuthService {
  async login(credentials: Credentials): Promise<IUser | null> {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data.user;
    } catch (error) {
      console.error("Login failed", error);
      return null;
    }
  }

  async logout(): Promise<void> {
    await axios.post(`${API_URL}/logout`);
  }

  async checkAuthStatus(): Promise<IUser> {
    const response = await axios.get(`${API_URL}/status`);
    return response.data.user;
  }
}

export default new AuthService();
