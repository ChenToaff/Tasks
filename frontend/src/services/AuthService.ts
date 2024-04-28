import IPerson from "@interfaces/IPerson";
import axios from "axios";

const API_URL = "/api/auth";

export interface Credentials {
  username: string;
  password: string;
}

class AuthService {
  async login(credentials: Credentials): Promise<IPerson | null> {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data.user;
    } catch (error) {
      console.error("Login failed", error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  async checkAuthStatus(): Promise<IPerson | null> {
    try {
      const response = await axios.get(`${API_URL}/status`);
      return response.data.user;
    } catch (error) {
      console.error("Authentication check failed", error);
      return null;
    }
  }
}

export default new AuthService();
