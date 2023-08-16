import { Box } from "@mui/material";
import ImageSlot from "../ImageSlot";

const SingleSlotChoice = ({
  chosenItem,
  choosing,
  handleClick,
  customConSx,
  customImgSx,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={35}
      py={10}
    >
      <ImageSlot
        data={chosenItem}
        containerSx={{
          border: "1px solid",
          borderColor: choosing ? "primary.main" : "white",
          "&:hover": {
            borderColor: "primary.dark",
          },
          ...customConSx,
        }}
        imageSx={{
          objectFit: "contain",
          ...customImgSx,
        }}
        handleClick={handleClick}
      />
    </Box>
  );
};

export default SingleSlotChoice;
