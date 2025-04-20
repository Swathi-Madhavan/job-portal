import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      alert("Registration successful. Please log in.");
      navigate("/login");
    } catch (err) {
      alert("User already exists");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4">Register</Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 16 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            onChange={handleChange}
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Register
          </Button>
          <Button fullWidth onClick={() => navigate("/login")} sx={{ mt: 1 }}>
            Already have an account? Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
