import { Box } from "@mui/material";

const ImageSlot = ({ data, containerSx, imageSx, handleClick }) => {
  return (
    <Box sx={containerSx}>
      {data && (
        <Box
          component="img"
          src={data.image}
          alt={`${data.name} Image`}
          sx={imageSx}
          onClick={handleClick}
        />
      )}
    </Box>
  );
};

export default ImageSlot;
