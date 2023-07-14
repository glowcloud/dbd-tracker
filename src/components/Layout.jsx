import { Box, Toolbar } from "@mui/material";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Navbar />
      <Box component="main" py={2}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
