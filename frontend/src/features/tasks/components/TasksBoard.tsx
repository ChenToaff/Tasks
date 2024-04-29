import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(calories: number, fat: number, carbs: number) {
  return { calories, fat, carbs };
}

const rows = [
  createData(159, 6.0, 24),
  createData(237, 9.0, 37),
  createData(262, 16.0, 24),
  createData(305, 3.7, 67),
  createData(356, 16.0, 49),
];

export default function TaskBoard() {
  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="right">To Do</TableCell>
          <TableCell align="right">In Progress</TableCell>
          <TableCell align="right">Done</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow
            key={index}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
