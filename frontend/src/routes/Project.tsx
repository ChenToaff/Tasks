import Kanban from "@components/Kanban";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useSelectedProject from "@features/projects/hooks/useSelectedProject";
import { useSelectedTask } from "@features/tasks/hooks/useSelectedTask";

export default function Project() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  if (!projectId) {
    navigate("/");
    return null;
  }
  const { setSelectedTaskId } = useSelectedTask();
  const { project } = useSelectedProject(projectId);

  if (!project) {
    return <h1>Project not found!</h1>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        flexShrink: 1,
        overflow: "auto",
      }}
      onClick={() => setSelectedTaskId(null)}
    >
      <>
        <div>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
        <Kanban projectId={projectId} />
      </>
    </Box>
  );
}
