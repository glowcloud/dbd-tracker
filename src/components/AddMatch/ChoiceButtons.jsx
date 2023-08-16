import { Box, Button } from "@mui/material";

const ChoiceButtons = ({
  resetText,
  handleReset,
  confirmText,
  handleConfirm,
}) => {
  return (
    <Box>
      <Button variant="outlined" sx={{ my: 5, mx: 2 }} onClick={handleReset}>
        {resetText}
      </Button>
      <Button variant="outlined" sx={{ my: 5, mx: 2 }} onClick={handleConfirm}>
        {confirmText}
      </Button>
    </Box>
  );
};

export default ChoiceButtons;
