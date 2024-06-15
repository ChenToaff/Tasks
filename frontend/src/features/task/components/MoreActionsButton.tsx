import { Box, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { red } from "@mui/material/colors";
import { useTaskInEdit } from "../hooks/useTaskInEdit";
import ITask from "@interfaces/ITask";
import { useSelectedTask } from "../hooks/useSelectedTask";
import TaskService from "../api/TaskService";

export default function MoreActionsButton({ task }: { task: ITask }) {
  const [open, setOpen] = useState(false);
  const { setTaskInEditId } = useTaskInEdit();
  const { setSelectedTaskId } = useSelectedTask();
  const buttonRef = useRef(null);

  function handleClose() {
    setOpen(false);
  }

  function handleDeleteTask() {
    TaskService.deleteTask(task.id);
  }

  return (
    <Box
      sx={{ ml: "auto" }}
      className="hidden-button"
      onClick={(e) => e.stopPropagation()}
    >
      <IconButton
        title="More Actions"
        ref={buttonRef}
        onClick={() => setOpen(true)}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        disableRestoreFocus
        disableAutoFocus
        anchorEl={buttonRef.current}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => setTaskInEditId(task.id)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit task title
        </MenuItem>
        <MenuItem onClick={() => setSelectedTaskId(task.id)}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          View task
        </MenuItem>
        <MenuItem sx={{ color: red[500] }} onClick={handleDeleteTask}>
          <ListItemIcon>
            <DeleteIcon sx={{ color: red[500] }} fontSize="small" />
          </ListItemIcon>
          Delete task
        </MenuItem>
      </Menu>
    </Box>
  );
}
