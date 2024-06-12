import AddIcon from "@mui/icons-material/Add";
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useProjects } from "../hooks/useProjects";

export default function ProjectSideBarList({ open }: { open: boolean }) {
  if (!open) return <></>;
  const [collapsed, setCollapsed] = useState(true);
  const { projects, loadMore, canLoadMore, loading } = useProjects();
  const navigate = useNavigate();
  const location = useLocation();

  function handleNewProjectButton() {
    navigate("/projects/new");
  }

  function handleCollapse() {
    setCollapsed((prev) => !prev);
  }
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListItemButton onClick={handleCollapse}>
          <ListItemText primary="Projects" />
          <IconButton onClick={handleNewProjectButton}>
            <AddIcon />
          </IconButton>
          {collapsed ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      }
    >
      <Collapse in={collapsed} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {projects.map((project) => (
            <ListItemButton
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              selected={location.pathname === `/projects/${project.id}`}
            >
              <ListItemText sx={{ pl: 2 }} primary={project.name} />
            </ListItemButton>
          ))}
          {canLoadMore && (
            <ListItemButton onClick={loadMore}>
              <ListItemText secondary={"Load More"} />
            </ListItemButton>
          )}
        </List>
      </Collapse>
    </List>
  );
}
