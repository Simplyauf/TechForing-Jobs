import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Alert,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EditJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [jobData, setJobData] = useState({
    title: "",
    category: "",
    description: "",
    requirements: "",
    location: "",
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch job");
        }
        setJobData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchJob();
  }, [id]);

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
        setError("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(jobData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update job");
      }

      alert("Job updated successfully!");
      navigate("/jobs");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Job Position
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
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Job"}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/jobs")}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditJob;
