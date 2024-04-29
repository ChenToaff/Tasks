import { Draggable } from "react-beautiful-dnd";
import { Box } from "@mui/material";
import ITask from "@interfaces/ITask";

const TaskCard = ({ item, index }: { item: ITask; index: number }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "15px",
              paddingTop: "0",
              minHeight: "106px",
              borderRadius: "5px",
              maxWidth: "311px",
              margin: "auto",
              background: "white",
              marginBottom: "15px",
            }}
          >
            <p>{item.title}</p>
            <Box
              sx={{
                display: "flex",
                justifyXontent: "space-between",
                alignItems: "center",
                width: "100%",
                fontSize: "12px",
                fontWeight: "400px",
                color: "#7d7d7d",
              }}
            >
              <p>
                <span>
                  {new Date(item.dueDate).toLocaleDateString("en-us", {
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
                <br />
                <span>{item.status}</span>
              </p>
            </Box>
          </Box>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
