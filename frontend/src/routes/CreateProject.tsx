import {
  Box,
  Container,
  CssBaseline,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FolderIcon from "@mui/icons-material/ArrowBack";
import CreateProjectForm from "@features/projects/components/CreateProjectForm";

export default function CreateProject(): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ width: 50, height: 50 }}>
          <FolderIcon sx={{ width: 50, height: 50 }} />
        </IconButton>
        <Container maxWidth="md" sx={{ marginTop: 8, textAlign: "center" }}>
          <Typography variant="h3">Create a new project</Typography>
          <CssBaseline />
          <CreateProjectForm />
        </Container>
      </Box>
    </>
  );
}
