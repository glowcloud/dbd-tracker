import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const MatchResult = ({ setData, setStep }) => {
  const [result, setResult] = useState("");

  return (
    <Box my={10} px={40}>
      <FormControl fullWidth>
        <InputLabel>Match Result</InputLabel>
        <Select
          value={result}
          label="result"
          onChange={(e) => setResult(e.target.value)}
        >
          <MenuItem value="0 kills">0 kills</MenuItem>
          <MenuItem value="1 kill">1 kill</MenuItem>
          <MenuItem value="2 kills">2 kills</MenuItem>
          <MenuItem value="3 kills">3 kills</MenuItem>
          <MenuItem value="4 kills">4 kills</MenuItem>
        </Select>
      </FormControl>

      <Button
        sx={{ mt: 5 }}
        onClick={() => {
          setData((prevData) => {
            return {
              ...prevData,
              result: result,
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

export default MatchResult;
