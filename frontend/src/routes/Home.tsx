import { Box, Container, Typography } from "@mui/material";
import { PeopleCard } from "@features/people";
import { ProjectsCard } from "@features/projects";
import { TasksCard } from "@features/tasks";
import { useUser } from "@hooks/useUser";

export default function Home(): JSX.Element {
  const { user } = useUser();
  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} variant="h5">
        Home
      </Typography>
      <Typography variant="h6" align="center" paragraph>
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </Typography>
      <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
        Good afternoon, {user?.name}
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
        <PeopleCard />
      </Box>
    </Container>
  );
}
