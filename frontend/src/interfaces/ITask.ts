export default interface ITask {
  id: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  dueDate: string;
  projectId: string;
}
