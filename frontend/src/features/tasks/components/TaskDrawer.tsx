import { useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { IconButton, Theme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject } from "@emotion/react";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import { useSelectedTask } from "../hooks/useSelectedTask";
const drawerWidth = 600;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: "hidden",
  position: "static",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: "hidden",
  position: "static",

  width: 0,
  [theme.breakpoints.up("sm")]: {
    width: 0,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  height: "100%",
  flexShrink: 0,
  zIndex: 1000,

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": { ...openedMixin(theme), padding: 10 },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function TaskDrawer() {
  const boxRef = useRef<HTMLDivElement>(null);
  const { selectedTask, setSelectedTask } = useSelectedTask();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setTimeout(() => {
          setSelectedTask(null);
        }, 300); // Delay closing to allow transition effect
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Drawer
      variant="permanent"
      anchor={"right"}
      hideBackdrop={true}
      open={!!selectedTask}
      onClose={() => setSelectedTask(null)}
    >
      {!!selectedTask && (
        <IconButton
          sx={{
            width: "24px",
            height: "24px",
            right: 0,
            zIndex: (theme) => theme.zIndex.drawer + 1,

            background: "white",
            "&:focus": {
              outline: 0,
            },
          }}
          onClick={() => setSelectedTask(null)}
        >
          <CloseIcon />
        </IconButton>
      )}
      <h5>{selectedTask?.id}</h5>
      <h1>{selectedTask?.title}</h1>
    </Drawer>
  );
}
