import { Box, Button } from "@mui/material";

const ControlButtons = ({ setStep, setData }) => {
  return (
    <Box>
      <Button
        variant="outlined"
        sx={{ my: 5, mx: 2 }}
        onClick={() => setStep((prevStep) => prevStep - 1)}
      >
        Back
      </Button>
      <Button
        variant="contained"
        sx={{ my: 5, mx: 2 }}
        onClick={() => {
          setData({
            side: "",
            character: "",
            perks: [],
            offering: "",
            map: {},
            result: "",
            sideData: {},
          });
          setStep(0);
        }}
      >
        Reset
      </Button>
    </Box>
  );
};

export default ControlButtons;
