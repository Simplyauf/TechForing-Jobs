import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    category: "",
    description: "",
    requirements: "",
    location: "",
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jobs/categories`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(jobData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create job");
      }

      setJobData({
        title: "",
        category: "",
        description: "",
        requirements: "",
        location: "",
      });
      alert("Job created successfully!");
      navigate("/jobs");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Job Position
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Job Title"
            margin="normal"
            required
            value={jobData.title}
            onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
          />
          <TextField
            select
            fullWidth
            label="Category"
            margin="normal"
            required
            value={jobData.category}
            onChange={(e) =>
              setJobData({ ...jobData, category: e.target.value })
            }
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            required
            multiline
            rows={4}
            value={jobData.description}
            onChange={(e) =>
              setJobData({ ...jobData, description: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Requirements"
            margin="normal"
            required
            multiline
            rows={4}
            value={jobData.requirements}
            onChange={(e) =>
              setJobData({ ...jobData, requirements: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Location"
            margin="normal"
            required
            value={jobData.location}
            onChange={(e) =>
              setJobData({ ...jobData, location: e.target.value })
            }
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Job"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateJob;
