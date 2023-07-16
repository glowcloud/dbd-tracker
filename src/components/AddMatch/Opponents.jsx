import { useState } from "react";
import { Box, Button } from "@mui/material";
import AddOpponent from "./AddOpponent";

const Opponents = ({ side, characters, perks, setStep, setData }) => {
  const [opponents, setOpponents] = useState(
    side === "killer" ? [null, null, null, null] : [null]
  );
  const [open, setOpen] = useState(false);
  const [opponentIndex, setOpponentIndex] = useState(-1);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Box>
        {opponents.map((op, index) => (
          <Box
            key={index}
            mx={5}
            onClick={() => {
              setOpponentIndex(index);
              setOpen(true);
            }}
            display="flex"
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
            {op &&
              op.perks.map((perk, perkIndex) => (
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
              ))}
          </Box>
        ))}
      </Box>

      {/* MODAL */}
      <AddOpponent
        open={open}
        handleClose={handleClose}
        characters={characters}
        perks={perks}
        opponentIndex={opponentIndex}
        setOpponents={setOpponents}
      />

      {/* CONFIRM BUTTON */}
      <Button
        sx={{ mt: 5 }}
        onClick={() => {
          setData((prevData) => {
            return {
              ...prevData,
              sideData: { ...prevData.sideData, opponents },
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

export default Opponents;
