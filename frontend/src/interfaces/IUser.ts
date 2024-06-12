import IProject from "./IProject";
import ITask from "./ITask";

export default interface IUser {
  id: string;
  username: string;
  name: string;
  projects: IProject[];
  Colleagues: IUser[];
  tasks: ITask[];
}
