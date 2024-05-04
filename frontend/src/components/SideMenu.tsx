import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";

import { styled, Theme, CSSObject } from "@mui/material/styles";
import DrawerHeader from "./DrawerHeader";
import { useNavigate } from "react-router-dom";
import ProjectSideBarList from "@features/projects/components/ProjectSideBarList";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  position: "static",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  position: "static",

  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideMenu() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const navigation: { [key: string]: string } = {
    Home: "/home",
    "My Tasks": "/tasks",
  };

  const handleDrawerClose = () => {
    setOpen((old) => !old);
  };
  return (
    <Drawer
      sx={{
        position: "relative",
        overflow: "visible",
      }}
      variant="permanent"
      open={open}
    >
      <DrawerHeader />
      <IconButton
        sx={{
          width: "24px",
          height: "24px",
          position: "absolute",
          border: "1px solid grey",
          top: "100px",
          right: "-12px",
          zIndex: (theme) => theme.zIndex.drawer + 1,

          background: "white",
          "&:focus": {
            outline: 0,
          },
        }}
        onClick={handleDrawerClose}
      >
        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      <List>
        {Object.keys(navigation).map((key, index) => (
          <ListItem key={key} disablePadding>
            <ListItemButton
              onClick={() => navigate(navigation[key])}
              selected={location.pathname === navigation[key]}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={key} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ProjectSideBarList open={open} />
      <Divider />
    </Drawer>
  );
}
