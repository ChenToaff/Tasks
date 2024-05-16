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

import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function ProjectSideBarList({ open }: { open: boolean }) {
  if (!open) return <></>;
  const [collapsed, setCollapsed] = useState(true);
  const projects = useSelector((state: RootState) => state.projects.data);
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
              <ListItemText primary={project.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
