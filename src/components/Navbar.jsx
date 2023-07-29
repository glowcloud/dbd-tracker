import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/other/bloodpointsIcon.png";
import { useAuth } from "../hooks/useAuth";

const userNavItems = [
  { title: "Home", route: "/" },
  { title: "Matches", route: "/matches" },
  { title: "Add Match", route: "/add-match" },
];

const guestNavItems = [
  { title: "Home", route: "/" },
  { title: "Login", route: "/login" },
];

const Navbar = () => {
  const { session, handleSignOut } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar component="nav" sx={{ px: 10, top: -1 }}>
      <Toolbar sx={{ justifyContent: "flex-end" }}>
        <Box
          sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
          onClick={() => navigate("/")}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ width: 35, height: 35, mx: "1rem" }}
          />
          <Typography variant="h6">Dead by Daylight Tracker</Typography>
        </Box>

        {session
          ? userNavItems.map((item) => (
              <Box
                component={Link}
                key={item.title}
                to={item.route}
                sx={{
                  textDecoration: "none",
                  mx: 2,
                  "&:visited": {
                    color: "inherit",
                  },
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              >
                {item.title}
              </Box>
            ))
          : guestNavItems.map((item) => (
              <Box
                component={Link}
                key={item.title}
                to={item.route}
                sx={{
                  textDecoration: "none",
                  mx: 2,
                  "&:visited": {
                    color: "inherit",
                  },
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              >
                {item.title}
              </Box>
            ))}
        {session && (
          <Box
            component={Link}
            to={"/"}
            onClick={handleSignOut}
            sx={{
              textDecoration: "none",
              mx: 2,
              "&:visited": {
                color: "inherit",
              },
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            Logout
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
