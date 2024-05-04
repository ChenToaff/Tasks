import ITask from "./ITask";

export default interface ITaskColumn {
  _id: string;
  title: string;
  tasks: ITask[];
}
