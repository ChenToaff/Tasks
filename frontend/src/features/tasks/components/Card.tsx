import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Card, CardContent, Typography } from "@mui/material";

export default function TasksCard() {
  const [people, setPeople] = useState<string[]>([]);

  useEffect(() => {
    setPeople(["Chen", "Omri Kuperberg"]);
  }, []);

  return (
    <Card>
      <CardContent sx={{ minHeight: 150 }}>
        <Typography variant="h4">My Tasks</Typography>
        <Typography>Card content</Typography>
      </CardContent>
    </Card>
  );
}
