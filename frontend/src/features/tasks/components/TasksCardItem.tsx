import ITask from "@interfaces/ITask";
import { Box, Chip, ListItem, ListItemButton, Tooltip } from "@mui/material";
import { useSelectedTask } from "../hooks/useSelectedTask";
import useSelectedProject from "@features/projects/hooks/useSelectedProject";
import { useNavigate } from "react-router-dom";

export default function TasksCardItem({ task }: { task: ITask }) {
  const { setSelectedTask } = useSelectedTask();
  const { project } = useSelectedProject(task.projectId);
  const navigate = useNavigate();
  return (
    <ListItem
      dense
      divider
      disablePadding
      alignItems="flex-start"
      onClick={() => setSelectedTask(task)}
    >
      <ListItemButton>
        <p>{task.title}</p>
        <Box margin="auto" />
        {project && (
          <Tooltip
            arrow
            placement="top"
            title={`Click to view all tasks in ${project.name}`}
          >
            <Chip
              onClick={() => {
                navigate(`/projects/${project.id}`);
              }}
              variant="outlined"
              label={project.name}
              size="small"
            />
          </Tooltip>
        )}
      </ListItemButton>
    </ListItem>
  );
}
