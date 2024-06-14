import { Box, Container, Typography } from "@mui/material";
import { ColleaguesCard } from "@features/colleagues";
import { ProjectsCard } from "@features/projects";
import { TasksCard } from "@features/tasks";
import { useAuth } from "@features/auth/hooks/useAuth";
import { useSelectedTask } from "@features/tasks/hooks/useSelectedTask";

export default function Home(): JSX.Element {
  const { user } = useAuth();
  const { setSelectedTaskId } = useSelectedTask();

  function getTimeOfDay() {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 6) {
      return "night";
    } else if (6 <= hours && hours < 12) {
      return "morning";
    } else if (12 <= hours && hours < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  }
  return (
    <Container onClick={() => setSelectedTaskId(null)} sx={{ pt: 4 }}>
      <Typography variant="h6" align="center" paragraph>
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </Typography>
      <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
        Good {getTimeOfDay()}, {user?.name}
      </Typography>
      <br />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <TasksCard />
        <ProjectsCard />
        <ColleaguesCard />
      </Box>
    </Container>
  );
}
