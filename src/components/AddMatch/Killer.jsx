import { useState } from "react";
import { Box, Button } from "@mui/material";
import AddCharacter from "./AddCharacter";
import CharacterRow from "../Matches/CharacterRow";

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
      <Box
        onClick={() => {
          setOpen(true);
        }}
        sx={{
          mx: 5,
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

      {/* CONFIRM BUTTON */}
      <Button
        sx={{ mt: 5 }}
        onClick={() => {
          setData((prevData) => {
            return {
              ...prevData,
              sideData: { ...prevData.sideData, killer: killer },
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

export default Killer;
