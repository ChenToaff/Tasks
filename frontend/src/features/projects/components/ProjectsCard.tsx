import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import Skeleton from "@mui/material/Skeleton";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";

export default function ProjectsCard() {
  const { projects, loadMore, canLoadMore, loading } = useProjects();
  const navigate = useNavigate();

  function handleNewProjectButton() {
    navigate("/projects/new");
  }
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "330px",
        ":hover": {
          border: "1px solid #afabac",
        },
      }}
    >
      <CardHeader
        action={
          <IconButton onClick={handleNewProjectButton}>
            <AddIcon />
          </IconButton>
        }
        title="Projects"
        sx={{ pb: 0 }}
      />
      {loading ? (
        <Skeleton animation="wave" variant="rectangular" width="100%">
          <div style={{ paddingTop: "57%" }} />
        </Skeleton>
      ) : (
        <CardContent sx={{ overflowY: "auto", padding: 0, paddingLeft: "5px" }}>
          <List
            sx={{
              height: "100%",
              display: "flex",
              flexWrap: "wrap",
              alignContent: "flex-start",
            }}
          >
            {projects.map((project) => (
              <ListItemButton
                key={project.id}
                sx={{ flex: "0 0 50%" }}
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
      )}
      {canLoadMore && (
        <CardActions>
          <Button onClick={loadMore} variant="text">
            Load More
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
