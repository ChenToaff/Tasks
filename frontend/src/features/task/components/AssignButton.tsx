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
import { useColleagues } from "@features/colleague/hooks/useColleagues";
import IUser from "@interfaces/IUser";
import ITask from "@interfaces/ITask";
import TaskService from "../api/TaskService";
import Avatar from "@mui/material/Avatar";
import useColleagueById from "@features/colleague/hooks/useColleagueById";
import useAuth from "@features/auth/hooks/useAuth";
import useUpdateEffect from "@hooks/useUpdateEffect";
import formatNameForAvatar from "@utils/formatNameForAvatar";

export default function AssignButton({ task }: { task: ITask }) {
  const { colleagues } = useColleagues();
  const { user } = useAuth();
  const options = [
    { name: "You", username: user?.username, id: user?.id },
    ...Object.values(colleagues),
  ];
  const colleague = useColleagueById(task.assignedTo);
  const assignee = task.assignedTo == user?.id ? user : colleague;
  const [selectedUser, setSelectedUser] = useState<Partial<IUser> | null>(
    assignee
  );

  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const filterOptions = createFilterOptions({
    stringify: ({ name, username, id }: Partial<IUser>) =>
      `${name} ${username} ${id}`,
  });

  useUpdateEffect(() => {
    function assignToUser() {
      TaskService.assignTask(task.id, selectedUser?.id ?? null);
      if (selectedUser) {
        setOpen(false);
      }
    }
    assignToUser();
  }, [selectedUser]);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Tooltip title="Assign this task">
        <IconButton ref={buttonRef} onClick={() => setOpen(true)}>
          {assignee ? (
            <Avatar sx={{ width: "24px", height: "24px", fontSize: "small" }}>
              {formatNameForAvatar(assignee.name)}
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
            value={selectedUser}
            options={options}
            onChange={(e, value) => setSelectedUser(value)}
            // defaultValue={{ username: task.assignedTo }}
            filterOptions={filterOptions}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={({ username }) => {
              return `${username}`;
            }}
            filterSelectedOptions
            renderOption={(props, option: Partial<IUser>) => {
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
