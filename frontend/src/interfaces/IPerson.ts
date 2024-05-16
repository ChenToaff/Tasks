import IProject from "./IProject";
import ITask from "./ITask";

export default interface IPerson {
  id: string;
  username: string;
  name: string;
  projects: IProject[];
  Colleagues: IPerson[];
  tasks: ITask[];
}
