import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Divider,
} from "@mui/material";

const SurvivorStatus = ({ setData, setStep }) => {
  const [status, setStatus] = useState("");

  return (
    <>
      <Typography variant="h4" my={4}>
        Choose your status:
      </Typography>
      <Box px={{ lg: 55, xl: 85 }}>
        <FormControl fullWidth>
          <InputLabel>Your Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="escaped">Escaped</MenuItem>
            <MenuItem value="killed">Killed</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          sx={{ my: 5 }}
          onClick={() => {
            setData((prevData) => {
              return {
                ...prevData,
                sideData: { ...prevData.sideData, status: status },
              };
            });
            setStep((prevStep) => prevStep + 1);
          }}
        >
          Confirm
        </Button>
      </Box>
      <Divider />
    </>
  );
};

export default SurvivorStatus;
