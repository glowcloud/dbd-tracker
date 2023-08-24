import { Box, Link, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (session) {
      navigate("/add-match");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box
      textAlign="center"
      sx={{
        margin: "0",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Typography variant="h3">Welcome to</Typography>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Dead by Daylight Tracker
      </Typography>
      <Typography
        component={Link}
        variant="h5"
        onClick={handleNavigate}
        sx={{
          textDecoration: "none",
          textAlign: "center",
          "&:visited": {
            color: "inherit",
          },
          "&:hover": {
            color: "primary.dark",
            cursor: "pointer",
          },
        }}
      >
        {session
          ? "Click here to add a match."
          : "Log in to start tracking your matches."}
      </Typography>
    </Box>
  );
};

export default Home;
