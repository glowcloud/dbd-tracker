import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavbarLink = ({ item, handleClick }) => {
  return (
    <Box
      component={Link}
      to={item.route}
      onClick={handleClick}
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
  );
};

export default NavbarLink;
