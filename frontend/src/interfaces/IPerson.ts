import IProject from "./IProject";
import ITask from "./ITask";

export default interface IPerson {
  username: string;
  name: string;
  projects: IProject[];
  friends: IPerson[];
  tasks: ITask[];
}
