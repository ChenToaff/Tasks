import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { Card, CardContent, Typography } from "@mui/material";
import IPerson from "@interfaces/IPerson";
import PeopleService from "@services/PeopleService";
import AddIcon from "@mui/icons-material/Add";

export default function PeopleCard() {
  const [people, setPeople] = useState<IPerson[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const peopleData = await PeopleService.getAllPeople();
      if (peopleData) {
        setPeople(peopleData);
      }
    };

    fetchPeople();
  }, []);

  return (
    <Card sx={{ gridArea: "3 / 1 / 2 / -1" }}>
      <CardContent sx={{ minHeight: 300 }}>
        <Typography variant="h4">People</Typography>
        <IconButton onClick={() => {}} sx={{ p: 0, margin: 2 }}>
          <Avatar sx={{ width: "70px", height: "70px" }}>
            <AddIcon />
          </Avatar>
        </IconButton>
        {people.map((person) => {
          return (
            <IconButton onClick={() => {}} sx={{ p: 0, margin: 2 }}>
              <Avatar sx={{ width: "70px", height: "70px" }}>
                {person.name
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
