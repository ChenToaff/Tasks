import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Card, CardContent, CardHeader } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useColleagues } from "../hooks/useColleagues";

export default function ColleaguesCard() {
  const { colleagues, loading } = useColleagues();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "275px",
        ":hover": {
          border: "1px solid #afabac",
        },
        gridArea: "3 / 1 / 2 / -1",
      }}
      variant="outlined"
    >
      <CardHeader title="Colleagues" sx={{ pb: 0 }} />
      <CardContent sx={{ minHeight: 300 }}>
        <IconButton onClick={() => {}} sx={{ p: 0, margin: 2 }}>
          <Avatar sx={{ width: "70px", height: "70px" }}>
            <AddIcon />
          </Avatar>
        </IconButton>
        {Object.keys(colleagues).map((id) => {
          return (
            <IconButton key={id} onClick={() => {}} sx={{ p: 0, margin: 2 }}>
              <Avatar sx={{ width: "70px", height: "70px" }}>
                {colleagues[id].name
                  .split(" ")
                  .map((n) => n[0])
                  .join(" ")}
              </Avatar>
            </IconButton>
          );
        })}
      </CardContent>
    </Card>
  );
}
