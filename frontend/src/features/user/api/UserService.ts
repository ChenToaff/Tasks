class UserService {
  async fetchProjects(userId: string, startIndex: number, limit: number) {
    const response = await fetch(
      `/api/user/${userId}/projects?start=${startIndex}&limit=${limit}`
    );
    return response.json();
  }

  async fetchTasks(userId: string, startIndex: number, limit: number) {
    const response = await fetch(
      `/api/user/${userId}/tasks?start=${startIndex}&limit=${limit}`
    );
    return response.json();
  }

  async fetchColleagues(userId: string, startIndex: number, limit: number) {
    const response = await fetch(
      `/api/user/${userId}/colleagues?start=${startIndex}&limit=${limit}`
    );
    return response.json();
  }
}

export default new UserService();
