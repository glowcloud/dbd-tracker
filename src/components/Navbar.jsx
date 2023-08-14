import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/other/bloodpointsIcon.png";
import { useAuth } from "../hooks/useAuth";
import NavbarLink from "./NavbarLink";

const getNavItems = (session) => {
  if (session)
    return [
      { title: "Home", route: "/" },
      { title: "Matches", route: "/matches" },
      { title: "Add Match", route: "/add-match" },
    ];
  return [
    { title: "Home", route: "/" },
    { title: "Login", route: "/login" },
  ];
};

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

        {getNavItems(session).map((item) => (
          <NavbarLink key={item.title} item={item} />
        ))}
        {session && (
          <NavbarLink
            item={{ title: "Logout", route: "/" }}
            handleClick={handleSignOut}
          />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
