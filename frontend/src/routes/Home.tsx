import { Box, Container, Typography } from "@mui/material";
import { PeopleCard } from "@features/people";
import { ProjectsCard } from "@features/projects";
import { TasksCard } from "@features/tasks";

export default function Home(): JSX.Element {
  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} variant="h5">
        Home
      </Typography>
      <Typography variant="h6" align="center" paragraph>
        Saturday, March 23
      </Typography>
      <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
        Good afternoon, Chen
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
