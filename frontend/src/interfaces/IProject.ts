import ITask from "./ITask";
import ITaskColumn from "./ITaskColumn";

export default interface IProject {
  id: string;
  name: string;
  description: string;
  taskColumns: ITaskColumn[];
  members: string[];
  loaded: Boolean;
}
