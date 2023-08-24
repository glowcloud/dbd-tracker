import { useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import AddCharacter from "./AddCharacter";
import CharacterRow from "../Matches/CharacterRow";
import ChoiceButtons from "./ChoiceButtons";

const Killer = ({ setStep, setData, data }) => {
  const [killer, setKiller] = useState(
    data?.sideData?.killer ? data.sideData.killer : null
  );
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCharacter = (character) => {
    setKiller({ ...character, ...character.sideData });
  };

  return (
    <Box>
      <Typography variant="h4" mt={4} mb={6}>
        Choose the killer:
      </Typography>
      <Box
        onClick={() => {
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
            ...killer,
            addons: killer?.addons ? killer.addons : [null, null],
          }}
          player={false}
          side="killer"
          noResult
        />
      </Box>

      {/* MODAL */}
      <AddCharacter
        open={open}
        handleClose={handleClose}
        characterType="killer"
        handleAddCharacter={handleAddCharacter}
      />

      <ChoiceButtons
        resetText="Reset"
        handleReset={() => setKiller(null)}
        confirmText="Confirm"
        handleConfirm={() => {
          setData((prevData) => {
            return {
              ...prevData,
              sideData: { ...prevData.sideData, killer: killer },
            };
          });
          setStep((prevStep) => prevStep + 1);
        }}
      />

      <Divider />
    </Box>
  );
};

export default Killer;
