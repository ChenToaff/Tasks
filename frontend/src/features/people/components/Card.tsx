import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Card, CardContent, Typography } from "@mui/material";

export default function PeopleCard() {
  const [people, setPeople] = useState<string[]>([]);

  useEffect(() => {
    setPeople(["Chen", "Omri Kuperberg"]);
  }, []);

  return (
    <Card sx={{ gridArea: "3 / 1 / 2 / -1" }}>
      <CardContent sx={{ minHeight: 300 }}>
        <Typography variant="h4">People</Typography>
        {people.map((person) => {
          return (
            <IconButton onClick={() => {}} sx={{ p: 0, margin: 2 }}>
              <Avatar sx={{ width: "70px", height: "70px" }}>
                {person
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
