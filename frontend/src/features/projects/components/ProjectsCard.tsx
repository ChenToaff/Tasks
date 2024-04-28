import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { createSvgIcon } from "@mui/material/utils";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);

export default function ProjectsCard() {
  const [projects, setProjects] = useState<string[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    setProjects(["Chen", "Omri Kuperberg"]);
  }, []);

  function handleNewProjectButton() {
    navigate("/projects/new");
  }

  return (
    <Card>
      <CardHeader
        action={
          <Button variant="contained" onClick={handleNewProjectButton}>
            <AddIcon />
          </Button>
        }
        title="My Projects"
        // titleTypographyProps={{ variant: "h4" }}
      />

      <CardContent sx={{ minHeight: 150 }}>
        <List>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Project1" />
          </ListItemButton>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Project2" />
          </ListItemButton>
        </List>
      </CardContent>
    </Card>
  );
}
