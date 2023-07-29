import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);
  const { loading, error, handleSignUp, handleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (login) {
      await handleSignIn(email, password);

      if (error) {
        alert(error);
      } else {
        navigate("/matches");
      }
    } else {
      await handleSignUp(email, password);

      if (error) {
        alert(error);
      } else {
        navigate("/matches");
      }
    }
  };

  return (
    <Box textAlign="center" py={20}>
      <Typography variant="h4">{login ? "Login" : "Sign up"}</Typography>
      <Box component="form" onSubmit={handleSubmit} px={60} py={3}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2,
          }}
        />
        <TextField
          fullWidth
          label="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Box>
        <Button disabled={loading} variant="outlined" onClick={handleSubmit}>
          {loading ? "Loading..." : login ? "Login" : "Sign up"}
        </Button>
      </Box>
      <Box pt={2}>
        <Button
          disabled={loading}
          size="small"
          onClick={() => {
            setLogin((prevLogin) => !prevLogin);
          }}
        >
          {login
            ? "No account? Click here to sign up"
            : "Already have an account? Click here to login"}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
