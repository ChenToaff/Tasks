import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { columnsFromBackend, columns } from "./KanbanData";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { Box, Typography } from "@mui/material";
import ITask from "@interfaces/ITask";

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  overflow-y: scroll;
  overflow-x: hidden;
  position: relative;
  flex-grow: 1;
`;

interface KanBanColumn {
  [title: string]: {
    items: ITask[];
  };
}

const Kanban = () => {
  const [columns, setColumns] = useState<KanBanColumn>({});
  useEffect(() => {
    const tasks: ITask[] = [
      {
        id: "1",
        description: "",
        title:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
        assignedTo: "Beltran",
        // Assignee: 'Romona',
        status: "To-do",
        // Priority: 'Low',
        dueDate: "25-May-2020",
      },
      {
        id: "2",
        description: "",

        title: "Fix Styling",
        assignedTo: "Dave",
        // Assignee: 'Romona',
        status: "To-do",
        // Priority: 'Low',
        dueDate: "26-May-2020",
      },
      {
        id: "3",
        description: "",

        title: "Handle Door Specs",
        assignedTo: "Roman",
        // Assignee: 'Romona',
        status: "To-do",
        // Priority: 'Low',
        dueDate: "27-May-2020",
      },
      {
        id: "4",
        description: "",

        title: "morbi",
        assignedTo: "Gawen",
        // Assignee: 'Kai',
        status: "Done",
        // Priority: 'High',
        dueDate: "23-Aug-2020",
      },
      {
        id: "5",
        description: "",

        title: "proin",
        assignedTo: "Bondon",
        // Assignee: 'Antoinette',
        status: "In Progress",
        // Priority: 'Medium',
        dueDate: "05-Jan-2021",
      },
    ];
    const _columns: KanBanColumn = {};
    tasks.forEach((task) => {
      if (task.status in _columns) {
        _columns[task.status].items.push(task);
      } else {
        _columns[task.status] = { items: [task] };
      }
    });
    setColumns(_columns);
  }, []);

  const onDragEnd = (result: any, columns: any, setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      removed.status = destination.droppableId;

      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Box
        display="flex"
        sx={{
          width: "100%",
          gap: "45px",
          height: "70vh",
          justifyContent: "center",
        }}
      >
        {Object.keys(columns).map((status) => {
          return (
            <Droppable key={status} droppableId={status}>
              {(provided, snapshot) => (
                <Box display="flex" bgcolor="#f3f3f3" flexDirection="column">
                  <Typography margin="10px">{status}</Typography>
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {columns[status].items.map((item, index) => (
                      <TaskCard key={item.id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
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
