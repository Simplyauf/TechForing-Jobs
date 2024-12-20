import { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  Skeleton,
  Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const ViewJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
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
          throw new Error(data.message || "Failed to fetch job details");
        }

        setJob(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Skeleton variant="text" height={60} />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="rectangular" height={200} sx={{ my: 2 }} />
          <Skeleton variant="text" height={40} />
          <Skeleton variant="rectangular" height={100} />
        </Paper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!job) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info">Job not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {job.title}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <Chip icon={<CategoryIcon />} label={job.category} color="primary" />
          <Chip
            icon={<LocationOnIcon />}
            label={job.location}
            variant="outlined"
          />
          <Chip
            icon={<AccessTimeIcon />}
            label={new Date(job.createdAt).toLocaleDateString()}
            variant="outlined"
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {job.description}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Requirements
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {job.requirements}
          </Typography>
        </Box>

        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/edit-job/${job._id}`)}
          >
            Edit Job
          </Button>
          <Button variant="outlined" onClick={() => navigate("/jobs")}>
            Back to Jobs
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ViewJob;
