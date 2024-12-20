import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Alert,
  IconButton,
  Snackbar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAuthHook } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

const jobCategories = [
  { title: "Sales & Marketing", jobs: [] },
  { title: "Creative", jobs: [] },
  { title: "Human Resource", jobs: [] },
  { title: "Administration", jobs: [] },
  { title: "Digital Marketing", jobs: [] },
  { title: "Development", jobs: [] },
  { title: "Engineering", jobs: [] },
];

const Home = () => {
  const { isAuthenticated, token } = useAuthHook();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [categorizedJobs, setCategorizedJobs] = useState(jobCategories);
  const [expanded, setExpanded] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  console.log(isAuthenticated);
  console.log(token);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jobs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data);

        const updatedCategories = jobCategories.map((category) => ({
          ...category,
          jobs: data.filter((job) => job.category === category.title),
        }));
        setCategorizedJobs(updatedCategories);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchJobs();
  }, [isAuthenticated, token]);

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/jobs/${jobId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete job");
        }

        const updatedCategories = categorizedJobs.map((category) => ({
          ...category,
          jobs: category.jobs.filter((job) => job._id !== jobId),
        }));
        setCategorizedJobs(updatedCategories);

        setToast({
          open: true,
          message: "Job deleted successfully",
          severity: "success",
        });
      } catch (error) {
        setToast({
          open: true,
          message: error.message,
          severity: "error",
        });
      }
    }
  };

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast({ ...toast, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        BROWSE OPEN POSITIONS BY CATEGORY
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        We are always on the lookout for talented people
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            navigate("/create-job");
          }}
          sx={{
            "&:focus": {
              outline: "none",
            },
          }}
        >
          Create New Job
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        {categorizedJobs.map((category) => (
          <Accordion
            key={category.title}
            sx={{
              mb: 1,
              border: "1px solid black",
              borderRadius: "8px !important",
              "&:before": {
                display: "none",
              },
              "&:last-of-type": {
                borderRadius: "8px !important",
              },
              boxShadow: "none",
            }}
            expanded={expanded === category.title}
            onChange={handleChange(category.title)}
          >
            <AccordionSummary
              expandIcon={
                expanded === category.title ? <RemoveIcon /> : <AddIcon />
              }
              sx={{
                backgroundColor: "background.paper",
                "&:hover": { backgroundColor: "action.hover" },
                borderRadius: "8px",
                "& .MuiAccordionSummary-content": {
                  margin: "12px 0",
                },
              }}
            >
              <Typography variant="h6">
                {category.title} ({category.jobs.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {category.jobs.length === 0 ? (
                <Typography color="text.secondary">
                  No open positions at the moment
                </Typography>
              ) : (
                <Box>
                  {category.jobs.map((job) => (
                    <Box
                      key={job.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        py: 1,
                        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                      }}
                    >
                      <Typography>{job.title}</Typography>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/view-job/${job._id}`);
                          }}
                          sx={{
                            "&:focus": {
                              outline: "none",
                            },
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/edit-job/${job._id}`);
                          }}
                          sx={{
                            "&:focus": {
                              outline: "none",
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(job._id);
                          }}
                          sx={{
                            "&:focus": {
                              outline: "none",
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
