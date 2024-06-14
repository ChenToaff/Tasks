import ITask from "@interfaces/ITask";
import { ListItem, ListItemButton } from "@mui/material";
import { useSelectedTask } from "../hooks/useSelectedTask";

export default function TasksCardItem({ task }: { task: ITask }) {
  const { setSelectedTask } = useSelectedTask();
  return (
    <ListItem
      dense
      divider
      disablePadding
      onClick={() => setSelectedTask(task)}
    >
      <ListItemButton>
        <p>{task.title}</p>
      </ListItemButton>
    </ListItem>
  );
}
