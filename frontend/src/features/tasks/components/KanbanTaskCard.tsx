import { Draggable } from "react-beautiful-dnd";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import ITask from "@interfaces/ITask";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import { useSelectedTask } from "@features/tasks/hooks/useSelectedTask";
import AssignButton from "./AssignButton";
import TasksService from "@features/tasks/api/TasksService";

import { useTaskInEdit } from "@features/tasks/hooks/useTaskInEdit";
import MoreActionsButton from "./MoreActionsButton";

const KanbanTaskCard = ({ task, index }: { task: ITask; index: number }) => {
  const { setSelectedTask } = useSelectedTask();
  const { setTaskInEdit, taskInEdit } = useTaskInEdit();

  function handleTaskBlur() {
    setTaskInEdit((prevTask) => {
      if (prevTask?.id === task.id) {
        return null;
      }
      return prevTask;
    });
  }
  function handleTaskChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = e.target.value || "";
    TasksService.updateTask(task.id, { title: value });
  }

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            onClick={(e) => {
              e.stopPropagation();
              setSelectedTask(task);
            }}
            sx={{
              marginBottom: "15px",
              ":hover": {
                boxShadow: 1,
                border: "1px solid #afabac",
              },

              "& .hidden-button": {
                display: "none",
              },
              "&:hover .hidden-button": {
                display: "inline-flex",
              },
            }}
          >
            <CardContent sx={{ paddingBottom: 0 }}>
              {task.id === taskInEdit?.id ? (
                <Input
                  sx={{ padding: 0 }}
                  inputProps={{
                    style: {
                      padding: 0,
                    },
                  }}
                  fullWidth
                  autoFocus
                  onFocus={(e) =>
                    e.currentTarget.setSelectionRange(
                      e.currentTarget.value.length,
                      e.currentTarget.value.length
                    )
                  }
                  multiline
                  onBlur={handleTaskBlur}
                  defaultValue={task.title}
                  onClick={(e) => e.stopPropagation()}
                  onChange={handleTaskChange}
                  disableUnderline={true}
                  placeholder="write a new task here"
                />
              ) : (
                <Typography
                  style={{ wordWrap: "break-word", minHeight: "1.5rem" }}
                  gutterBottom
                >
                  {task.title}
                </Typography>
              )}
            </CardContent>
            <CardActions sx={{ paddingBottom: 0 }} disableSpacing>
              <AssignButton task={task} />
              <IconButton className="hidden-button">
                <EventOutlinedIcon />
              </IconButton>
              <MoreActionsButton task={task} />
            </CardActions>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanTaskCard;