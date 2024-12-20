import { useAuthHook } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

const Home = () => {
  const { isAuthenticated } = useAuthHook();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Job Portal
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Please login to explore available job listings
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Welcome Back!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Ready to explore new opportunities?
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/jobs")}
        sx={{ mt: 2 }}
      >
        View Jobs
      </Button>
    </Container>
  );
};

export default Home;
