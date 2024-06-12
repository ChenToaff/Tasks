import React, { useState, useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import IUser from "@interfaces/IUser";
import ColleaguesSelect from "@features/colleagues/components/ColleaguesSelect";
import UsersService from "@services/UsersService";
import ProjectsService from "@features/projects/api/ProjectsService";
import { useNavigate } from "react-router-dom";

const CreateProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);
  const [users, setUsers] = React.useState<IUser[]>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await UsersService.getAllUsers();
      if (usersData) {
        setUsers(usersData);
      }
    };

    fetchUsers();
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
        selectFrom={users}
        setSelected={setMembers}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Create
      </Button>
    </Box>
  );
};

export default CreateProjectForm;
