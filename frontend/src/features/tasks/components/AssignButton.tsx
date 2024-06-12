import {
  Autocomplete,
  Box,
  IconButton,
  Popover,
  TextField,
  Tooltip,
  Typography,
  createFilterOptions,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useRef, useState } from "react";
import { useColleagues } from "@features/colleagues/hooks/useColleagues";
import IPerson from "@interfaces/IPerson";
import ITask from "@interfaces/ITask";
import TasksService from "../api/TasksService";
import Avatar from "@mui/material/Avatar";
import useColleagueById from "@features/colleagues/hooks/useColleagueById";

export default function AssignButton({ task }: { task: ITask }) {
  const { colleagues } = useColleagues();
  const colleague = useColleagueById(task.assignedTo);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  const filterOptions = createFilterOptions({
    stringify: ({ name, username, id }: Partial<IPerson>) =>
      `${name} ${username} ${id}`,
  });

  function assignToUser(e: any, selectedUser: Partial<IPerson> | null) {
    TasksService.assignTask(task.id, selectedUser?.id ?? null);
    setOpen(false);
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Tooltip title="Assign this task">
        <IconButton ref={buttonRef} onClick={() => setOpen(true)}>
          {colleague ? (
            <Avatar sx={{ width: "24px", height: "24px", fontSize: "small" }}>
              {colleague.name
                .split(" ")
                .map((n) => n[0])
                .join(" ")}
            </Avatar>
          ) : (
            <PersonOutlineOutlinedIcon />
          )}
        </IconButton>
      </Tooltip>

      <Popover
        open={open}
        TransitionProps={{
          onEntered: () => inputRef?.current?.focus(),
        }}
        anchorEl={buttonRef.current}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ width: "400px", padding: 3, paddingTop: 0 }}>
          <Typography sx={{ p: 2 }}>Assignee</Typography>
          <Autocomplete
            openOnFocus
            id="tags-outlined"
            defaultValue={colleague}
            options={Object.values(colleagues)}
            onChange={assignToUser}
            // defaultValue={{ username: task.assignedTo }}
            filterOptions={filterOptions}
            getOptionLabel={({ username }) => {
              return `${username}`;
            }}
            filterSelectedOptions
            renderOption={(props, option: Partial<IPerson>) => {
              return (
                <li {...props}>
                  {option.name}&nbsp;&nbsp;&nbsp;@{option.username}
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                inputRef={inputRef}
                {...params}
                variant="outlined"
                placeholder="Name or Username"
                // label="Name or Student ID"
              />
            )}
          />
        </Box>
      </Popover>
    </div>
  );
}
