export default interface ITask {
  id: string;
  title: string;
  description: string;
  completed: Boolean;
  assignedTo: string;
  dueDate: string;
  projectId: string;
  taskColumnId: string;
  editMode: Boolean;
}
