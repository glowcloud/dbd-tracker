import { useState } from "react";
import { Box, Button } from "@mui/material";
import AddCharacter from "./AddCharacter";

import DCIcon from "../../assets/other/DCIcon.png";
import SacrificedIcon from "../../assets/other/sacrificedIcon.png";
import EscapedIcon from "../../assets/other/escapedIcon.png";

const Survivors = ({ side, characters, perks, setStep, setData, data }) => {
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
      temp[characterIndex] = character;
      return temp;
    });
  };

  return (
    <Box>
      {chosenCharacters.map((op, index) => (
        <Box
          key={index}
          m={5}
          onClick={() => {
            setCharacterIndex(index);
            setOpen(true);
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <Box
            sx={{
              width: 200,
              height: 200,
              border: "1px solid white",
            }}
          >
            {op && (
              <Box
                component="img"
                src={op.character.image}
                alt={`${op.character.id} Image`}
                sx={{
                  width: 200,
                  height: 200,
                  objectFit: "contain",
                }}
              />
            )}
          </Box>
          {op
            ? op.perks.map((perk, perkIndex) => (
                <Box
                  key={perkIndex}
                  sx={{
                    width: 100,
                    height: 100,
                    transform: "rotate(45deg)",
                    border: "1px solid white",
                    m: 5,
                  }}
                >
                  {perk && (
                    <Box
                      component="img"
                      src={perk.image}
                      alt={`${perk.id} Image`}
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: "contain",
                        transform: "rotate(-45deg)",
                      }}
                    />
                  )}
                </Box>
              ))
            : Array.apply(null, Array(4)).map((perkIndex) => (
                <Box
                  key={perkIndex}
                  sx={{
                    width: 100,
                    height: 100,
                    transform: "rotate(45deg)",
                    border: "1px solid white",
                    m: 5,
                  }}
                ></Box>
              ))}

          <Box
            sx={{
              width: 100,
              height: 100,
              border: "1px solid white",
              borderRadius: "50%",
              m: 5,
            }}
          >
            {op && op.status && (
              <Box
                component="img"
                src={
                  op.status === "killed"
                    ? SacrificedIcon
                    : op.status === "escaped"
                    ? EscapedIcon
                    : DCIcon
                }
                alt={`Status Image`}
                sx={{
                  width: 75,
                  height: 100,
                  objectFit: "contain",
                }}
              />
            )}
          </Box>
        </Box>
      ))}

      {/* MODAL */}
      <AddCharacter
        open={open}
        handleClose={handleClose}
        characterType="survivor"
        characters={characters}
        perks={perks}
        characterIndex={characterIndex}
        handleAddCharacter={handleAddCharacter}
      />

      {/* CONFIRM BUTTON */}
      <Button
        sx={{ mt: 5 }}
        onClick={() => {
          setData((prevData) => {
            return {
              ...prevData,
              survivors: chosenCharacters,
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

export default Survivors;
