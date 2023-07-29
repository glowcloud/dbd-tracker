import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const SurvivorStatus = ({ setData, setStep }) => {
  const [status, setStatus] = useState("");

  return (
    <Box my={10} px={40}>
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
        sx={{ mt: 5 }}
        onClick={() => {
          setData((prevData) => {
            return {
              ...prevData,
              sideData: { status: status },
            };
          });
          setStep((prevStep) => prevStep + 1);
        }}
      >
        Confirm
      </Button>
    </Box>
  );
};

export default SurvivorStatus;
