import ITask from "./ITask";

export default interface ITaskColumn {
  id: string;
  title: string;
  tasks: ITask[];
}
