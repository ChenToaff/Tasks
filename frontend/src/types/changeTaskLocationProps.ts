export default interface ChangeTaskLocationProps {
  projectId: string;
  taskId: string;
  sourceColumnId: string;
  destColumnId: string;
  position: number;
}
