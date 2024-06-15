import { Card, CardContent, CardHeader, List } from "@mui/material";
import useAuth from "@features/auth/hooks/useAuth";
import useTasks from "../hooks/useTasks";
import TasksCardItem from "./TasksCardItem";
import { Link } from "react-router-dom";

export default function TasksCard() {
  const { user } = useAuth();
  const { tasks } = useTasks(user?.id ?? "");

  return (
    <Card
      onClick={(e) => e.stopPropagation()}
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "330px",
        ":hover": {
          border: "1px solid #afabac",
        },
      }}
    >
      <CardHeader
        title={
          <Link
            style={{ textDecoration: "none", color: "unset" }}
            to={"/tasks"}
          >
            {"My Tasks"}
          </Link>
        }
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ overflowY: "auto", paddingTop: 0 }}>
        <List sx={{ width: "100%" }}>
          {tasks.map((task) => (
            <TasksCardItem key={task.id} task={task} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
