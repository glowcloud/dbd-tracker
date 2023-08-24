import { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import AddCharacter from "./AddCharacter";
import CharacterRow from "../Matches/CharacterRow";
import ChoiceButtons from "./ChoiceButtons";

const Survivors = ({ side, setStep, setData, data }) => {
  const [chosenCharacters, setChosenCharacters] = useState(
    data?.survivors?.length > 0
      ? data.survivors
      : side === "killer"
      ? [null, null, null, null]
      : [null, null, null]
  );
  const [open, setOpen] = useState(false);
  const [characterIndex, setCharacterIndex] = useState(-1);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCharacter = (character) => {
    setChosenCharacters((prevCharacters) => {
      const temp = [...prevCharacters];
      temp[characterIndex] = { ...character, ...character.sideData };
      return temp;
    });
  };

  return (
    <Box>
      <Typography variant="h4" mt={4} mb={6}>
        Choose the survivors:
      </Typography>

      {chosenCharacters.map((op, index) => (
        <Box
          key={index}
          onClick={() => {
            setCharacterIndex(index);
            setOpen(true);
          }}
          sx={{
            mx: { lg: 5, xl: 25 },
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <CharacterRow
            data={{
              ...op,
              item: op?.item?.item ? op.item.item : null,
              addons: op?.item?.addons ? op.item.addons : [null, null],
              escaped:
                op === null || op.status === ""
                  ? null
                  : op.status === "escaped"
                  ? true
                  : false,
            }}
            player={false}
            side="survivor"
          />
        </Box>
      ))}

      {/* MODAL */}
      <AddCharacter
        open={open}
        handleClose={handleClose}
        characterType="survivor"
        characterIndex={characterIndex}
        handleAddCharacter={handleAddCharacter}
      />

      <ChoiceButtons
        resetText="Reset"
        handleReset={() =>
          setChosenCharacters(
            side === "killer" ? [null, null, null, null] : [null, null, null]
          )
        }
        confirmText="Confirm"
        handleConfirm={() => {
          setData((prevData) => {
            return {
              ...prevData,
              survivors: chosenCharacters,
            };
          });
          setStep((prevStep) => prevStep + 1);
        }}
      />

      <Divider />
    </Box>
  );
};

export default Survivors;
