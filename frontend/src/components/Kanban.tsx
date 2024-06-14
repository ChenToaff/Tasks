import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import KanbanTaskCard from "../features/tasks/components/KanbanTaskCard";
import { Box, IconButton, Typography } from "@mui/material";
import ITaskColumn from "@interfaces/ITaskColumn";
import TasksService from "@features/tasks/api/TasksService";
import AddIcon from "@mui/icons-material/Add";
import useSelectedProject from "@features/projects/hooks/useSelectedProject";
import { useSelectedTask } from "@features/tasks/hooks/useSelectedTask";
import { useTaskInEdit } from "@features/tasks/hooks/useTaskInEdit";
import ProjectsService from "@features/projects/api/ProjectsService";

interface KanbanColumns {
  [id: string]: ITaskColumn;
}

const Kanban = ({ projectId }: { projectId: string }) => {
  const [columns, setColumns] = useState<KanbanColumns>({});

  const { project, isLoading } = useSelectedProject(projectId);
  const { setSelectedTaskId } = useSelectedTask();
  const { setTaskInEditId } = useTaskInEdit();

  useEffect(() => {
    if (!isLoading) {
      const dict: KanbanColumns = {};
      project!.taskColumns.map((column) => (dict[column.id] = column));
      setColumns(dict);
    }
  }, [project, isLoading]);
  useEffect(() => {
    setSelectedTaskId(null);
  }, []);

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceColumn = columns[source.droppableId];
    const sourceTasks = [...sourceColumn.tasks];
    const [removed] = sourceTasks.splice(source.index, 1);
    ProjectsService.changeTaskLocation({
      projectId: project!.id,
      taskId: removed.id,
      sourceColumnId: source.droppableId,
      destColumnId: destination.droppableId,
      position: destination.index,
    });
    setColumns((prevColumns: KanbanColumns) => ({
      ...prevColumns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceTasks,
      },
    }));

    const destColumn = columns[destination.droppableId];
    const destTasks =
      destination.droppableId === source.droppableId
        ? sourceTasks
        : [...destColumn.tasks];
    destTasks.splice(destination.index, 0, removed);

    setColumns((prevColumns: KanbanColumns) => ({
      ...prevColumns,
      [destination.droppableId]: {
        ...destColumn,
        tasks: destTasks,
      },
    }));
  };

  function handleCreateNewTask(column: ITaskColumn) {
    TasksService.createTask({
      projectId,
      taskColumnId: column.id,
    }).then((newTask) => {
      if (newTask) {
        setTaskInEditId(newTask.id);
      }
    });
  }

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Box
        display="flex"
        sx={{
          width: "100%",
          // gap: "25px",
          paddingBottom: "10px",
          height: "400px",
          flexGrow: 1,
        }}
      >
        {Object.keys(columns).map((column) => {
          return (
            <Droppable
              key={columns[column].title}
              droppableId={columns[column].id}
            >
              {(provided, snapshot) => (
                <Box
                  display="flex"
                  position="relative"
                  bgcolor="#f3f3f3"
                  flexDirection="column"
                  marginRight="25px"
                >
                  <Typography margin="10px">{columns[column].title}</Typography>

                  <IconButton
                    sx={{ position: "absolute", right: 0 }}
                    onClick={() => handleCreateNewTask(columns[column])}
                  >
                    <AddIcon />
                  </IconButton>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "280px",
                      borderRadius: "5px",
                      padding: "15px 15px",
                      overflowY: "auto",
                      overflowX: "hidden",
                      flexGrow: 1,
                    }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {columns[column].tasks.map((task, index) => (
                      <KanbanTaskCard key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </Box>
                </Box>
              )}
            </Droppable>
          );
        })}
      </Box>
    </DragDropContext>
  );
};

export default Kanban;
