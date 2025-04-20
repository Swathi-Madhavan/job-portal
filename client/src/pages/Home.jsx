import React, { useEffect, useState, useContext } from "react";
import { Container, Typography, Button, Box, TextField, Card, CardContent, Grid } from "@mui/material";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { logout } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", company: "", description: "" });

  const fetchJobs = async () => {
    const res = await API.get("/jobs");
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createJob = async (e) => {
    e.preventDefault();
    await API.post("/jobs", form);
    setForm({ title: "", company: "", description: "" });
    fetchJobs();
  };

  const deleteJob = async (id) => {
    await API.delete(`/jobs/${id}`);
    fetchJobs();
  };

  return (
    <Container>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Typography variant="h4">Job Portal</Typography>
        <Button variant="outlined" color="error" onClick={logout}>
          Logout
        </Button>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Create Job</Typography>
        <form onSubmit={createJob}>
          <TextField name="title" label="Job Title" fullWidth margin="normal" value={form.title} onChange={handleChange} />
          <TextField name="company" label="Company" fullWidth margin="normal" value={form.company} onChange={handleChange} />
          <TextField name="description" label="Description" fullWidth margin="normal" value={form.description} onChange={handleChange} />
          <Button variant="contained" type="submit" sx={{ mt: 1 }}>
            Create
          </Button>
        </form>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Job Listings</Typography>
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} key={job._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2">{job.company}</Typography>
                  <Typography variant="body1">{job.description}</Typography>
                  <Button variant="outlined" color="error" onClick={() => deleteJob(job._id)} sx={{ mt: 1 }}>
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
