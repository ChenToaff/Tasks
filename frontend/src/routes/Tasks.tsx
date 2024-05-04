import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function WelcomeView() {
  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} variant="h5">
        My Tasks
      </Typography>
    </Container>
  );
}
