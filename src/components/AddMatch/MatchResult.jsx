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

const MatchResult = ({ setData, setStep }) => {
  const [result, setResult] = useState("");

  return (
    <>
      <Typography variant="h4" my={4}>
        Match result:
      </Typography>
      <Box px={{ lg: 55, xl: 85 }}>
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
          variant="outlined"
          sx={{ my: 5 }}
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
          Confirm Result
        </Button>
      </Box>
      <Divider />
    </>
  );
};

export default MatchResult;
