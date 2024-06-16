import React, { useEffect, useState } from "react";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";
import useAuth from "@features/auth/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ username, password }).catch((e) => {
      setError(e.message);
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography color="primary" variant="h4">
        Login
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="email"
        autoFocus
        value={username}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>
      <p>Don't have an account? {<Link to="/signup">Sign up</Link>}</p>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}
