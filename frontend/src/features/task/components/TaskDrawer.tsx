import { useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Input, TextField, Theme } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject } from "@emotion/react";
import CloseIcon from "@mui/icons-material/CloseOutlined";
import { useSelectedTask } from "../hooks/useSelectedTask";
import AssignButton from "./AssignButton";
import TaskService from "../api/TaskService";
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
  const { selectedTask, setSelectedTaskId } = useSelectedTask();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setTimeout(() => {
          setSelectedTaskId(null);
        }, 300); // Delay closing to allow transition effect
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleTaskChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (!selectedTask) return;
    const value = e.target.value || "";
    TaskService.updateTask(selectedTask.id, { title: value });
  }

  return (
    <Drawer
      variant="permanent"
      anchor={"right"}
      hideBackdrop={true}
      open={!!selectedTask}
      onClose={() => setSelectedTaskId(null)}
    >
      {!!selectedTask && (
        <>
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
            onClick={() => setSelectedTaskId(null)}
          >
            <CloseIcon />
          </IconButton>
          <Input
            sx={{
              "&:before": {
                borderBottom: "none",
              },
            }}
            onChange={handleTaskChange}
            placeholder="Write a task here"
            defaultValue={selectedTask?.title}
            inputProps={{ style: { fontSize: 40 } }} // font size of input text
          />
          <Box alignItems="center" display="flex">
            <h3 style={{ width: "120px" }}>Assignee:</h3>
            <AssignButton task={selectedTask} />
          </Box>
          <Box alignItems="center" display="flex">
            <h3 style={{ width: "120px" }}>Project:</h3>
          </Box>
        </>
      )}
    </Drawer>
  );
}
