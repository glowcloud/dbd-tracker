import { Box, Tooltip } from "@mui/material";

const ImageSlot = ({ data, containerSx, imageSx, handleClick }) => {
  return (
    <Tooltip title={data?.name ? data.name : ""} arrow>
      <Box sx={containerSx} onClick={handleClick}>
        {data && (
          <Box
            component="img"
            src={data.image}
            alt={`${data.name} Image`}
            sx={imageSx}
          />
        )}
      </Box>
    </Tooltip>
  );
};

export default ImageSlot;
