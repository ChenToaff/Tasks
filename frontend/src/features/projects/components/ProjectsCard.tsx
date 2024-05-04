import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useUser } from "@hooks/useUser";
import { wrap } from "module";

export default function ProjectsCard() {
  const { user } = useUser();
  const projects = user?.projects ?? [];
  const navigate = useNavigate();

  function handleNewProjectButton() {
    navigate("/projects/new");
  }
  return (
    <Card>
      <CardHeader
        action={
          <IconButton onClick={handleNewProjectButton}>
            <AddIcon />
          </IconButton>
        }
        title="Projects"
        sx={{ pb: 0 }}
      />

      <CardContent>
        <List
          sx={{
            height: 200,
            display: "flex",
            flexWrap: "wrap",
            overflowY: "auto",
            alignContent: "flex-start",
          }}
        >
          {projects.map((project) => (
            <ListItemButton
              sx={{ flex: "1 1 50%" }}
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                primary={project.name}
              />
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
