import React, { useState } from "react";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import UserService from "@features/user/api/UserService";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    UserService.signup({ username, name, password })
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography color="primary" variant="h4">
        Sign Up
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Username"
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        inputProps={{ pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$" }}
        title="Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one digit"
        label="Password"
        type="password"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <p>Already have an account? {<Link to="/login">Login</Link>}</p>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}
