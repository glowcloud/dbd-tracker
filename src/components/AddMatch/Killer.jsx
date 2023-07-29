import { useState } from "react";
import { Box, Button } from "@mui/material";
import AddCharacter from "./AddCharacter";

const Killer = ({ setStep, setData, data }) => {
  const [killer, setKiller] = useState(
    data?.sideData?.killer ? data.sideData.killer : null
  );
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCharacter = (character) => {
    setKiller(character);
  };

  return (
    <Box>
      <Box
        m={5}
        onClick={() => {
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
          {killer && (
            <Box
              component="img"
              src={killer.character.image}
              alt={`${killer.character.id} Image`}
              sx={{
                width: 200,
                height: 200,
                objectFit: "contain",
              }}
            />
          )}
        </Box>
        {killer
          ? killer.perks.map((perk, perkIndex) => (
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
