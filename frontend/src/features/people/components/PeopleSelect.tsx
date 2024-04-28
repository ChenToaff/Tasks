import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import IPerson from "@interfaces/IPerson";

interface PeopleSelectProps {
  selected: string[];
  selectFrom: IPerson[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function PeopleSelect({
  setSelected,
  selected,
  selectFrom,
}: PeopleSelectProps) {
  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value },
    } = event;
    setSelected(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel required>Project Members</InputLabel>
        <Select
          multiple
          required
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput required label="Project Members" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {selectFrom.map((person) => (
            <MenuItem key={person.name} value={person.name}>
              {person.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
