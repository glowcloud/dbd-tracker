import { Box, Divider, Typography } from "@mui/material";
import survivorIcon from "../../assets/other/survivorIcon.png";
import killerIcon from "../../assets/other/killerIcon.png";

const SideChoice = ({ setStep, setData }) => {
  return (
    <Box>
      <Typography variant="h4" mt={10}>
        Choose your side:
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" my={10}>
        <Box
          component="img"
          src={survivorIcon}
          alt="Survivor Icon"
          sx={{ width: 150, height: 150, mx: "1rem" }}
          onClick={() => {
            setData((prevData) => {
              return {
                ...prevData,
                side: "survivor",
                sideData: {
                  item: {},
                  status: "",
                  teammates: [],
                  killer: {},
                },
              };
            });
            setStep(1);
          }}
        />
        <Divider orientation="vertical" flexItem />
        <Box
          component="img"
          src={killerIcon}
          alt="Killer Icon"
          sx={{ width: 150, height: 150, mx: "1rem" }}
          onClick={() => {
            setData((prevData) => {
              return {
                ...prevData,
                side: "killer",
                sideData: { addons: [], opponents: [] },
              };
            });
            setStep(1);
          }}
        />
      </Box>
    </Box>
  );
};

export default SideChoice;
