import React, { useState, useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import IPerson from "@interfaces/IPerson";
import ColleaguesSelect from "@features/colleagues/components/ColleaguesSelect";
import PeopleService from "@services/PeopleService";
import ProjectsService from "@features/projects/api/ProjectsService";
import { useNavigate } from "react-router-dom";

const CreateProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);
  const [people, setPeople] = React.useState<IPerson[]>([]);

  React.useEffect(() => {
    const fetchPeople = async () => {
      const peopleData = await PeopleService.getAllPeople();
      if (peopleData) {
        setPeople(peopleData);
      }
    };

    fetchPeople();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);
    ProjectsService.createProject({ name, description, members }).then(
      (project) => {
        // setLoading(false);
        if (project) {
          navigate(`/projects/${project.id}`);
        }
      }
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Project Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        id="description"
        label="Project Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <ColleaguesSelect
        selected={members}
        selectFrom={people}
        setSelected={setMembers}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Create
      </Button>
    </Box>
  );
};

export default CreateProjectForm;
