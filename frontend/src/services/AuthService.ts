import axios from "axios";

const API_URL = "/api/auth";

export interface Credentials {
  username: string;
  password: string;
}

class AuthService {
  async login(credentials: Credentials): Promise<boolean> {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data.isAuthenticated;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(`${API_URL}/logout`);
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  async checkAuthStatus(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_URL}/status`);
      return response.data.isAuthenticated;
    } catch (error) {
      console.error("Authentication check failed", error);
      return false;
    }
  }
}

export default new AuthService();
