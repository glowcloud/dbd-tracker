import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/other/bloodpointsIcon.png";

const navItems = [
  { title: "Home", route: "/" },
  { title: "Matches", route: "/matches" },
  { title: "Add Match", route: "/add-match" },
];

const Navbar = () => {
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

        {navItems.map((item) => (
          <Box
            component={Link}
            key={item.title}
            to={item.route}
            reloadDocument
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
