import { Box, Divider, Typography } from "@mui/material";
import survivorIcon from "../assets/other/survivorIcon.png";
import killerIcon from "../assets/other/killerIcon.png";

const SideChoice = ({ handleSurvivorChoice, handleKillerChoice }) => {
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
      <Typography variant="h4" mb={5}>
        Choose your side:
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box
          component="img"
          src={survivorIcon}
          alt="Survivor Icon"
          sx={{
            width: 150,
            height: 150,
            mx: "1rem",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleSurvivorChoice}
        />
        <Divider orientation="vertical" flexItem />
        <Box
          component="img"
          src={killerIcon}
          alt="Killer Icon"
          sx={{
            width: 150,
            height: 150,
            mx: "1rem",
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleKillerChoice}
        />
      </Box>
    </Box>
  );
};

export default SideChoice;
