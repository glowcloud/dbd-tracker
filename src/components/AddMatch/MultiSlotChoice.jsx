import { Box } from "@mui/material";
import ImageSlot from "../ImageSlot";
import { handleSlotChoice } from "../../utils/addMatchUtils";

const MultiSlotChoice = ({
  chosenItems,
  chosenSlot,
  setChosenSlot,
  setSearch,
  setPage,
  customConSx,
  customImgSx,
  itemChoice,
  setItemChoosing,
  addCharacter,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={addCharacter ? 20 : 35}
      py={5}
    >
      {chosenItems.map((addon, index) => (
        <ImageSlot
          key={index}
          data={addon}
          containerSx={{
            mx: 5,
            border: "1px solid",
            borderColor: chosenSlot === index ? "primary.main" : "white",
            "&:hover": {
              borderColor: "primary.dark",
            },
            ...customConSx,
          }}
          imageSx={{
            objectFit: "contain",
            ...customImgSx,
          }}
          handleClick={() => {
            if (itemChoice) {
              setItemChoosing(false);
            }
            handleSlotChoice(
              index,
              chosenSlot,
              setChosenSlot,
              setSearch,
              setPage
            );
          }}
        />
      ))}
    </Box>
  );
};

export default MultiSlotChoice;
