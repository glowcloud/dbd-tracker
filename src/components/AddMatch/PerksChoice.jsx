import { Box, Button, Divider } from "@mui/material";
import { useState } from "react";

const PerksChoice = ({ perks, setStep, data, setData }) => {
  const [chosenPerks, setChosenPerks] = useState(
    data.perks.length > 0 ? data.perks : [null, null, null, null]
  );
  const [chosenSlot, setChosenSlot] = useState(-1);

  const handleSlotChoice = (index) => {
    if (chosenSlot !== index) {
      setChosenSlot(index);
    } else {
      setChosenSlot(-1);
    }
  };

  const handlePerkChoice = (perk) => {
    if (chosenPerks.includes(perk)) {
      if (chosenPerks[chosenSlot] && chosenPerks[chosenSlot].id === perk.id) {
        setChosenPerks((prevChosen) => {
          const temp = [...prevChosen];
          temp[chosenSlot] = null;
          return temp;
        });
      } else {
        const indexOfPerk = chosenPerks.indexOf(perk);
        setChosenPerks((prevChosen) => {
          const temp = [...prevChosen];
          temp[indexOfPerk] = temp[chosenSlot];
          temp[chosenSlot] = perk;
          return temp;
        });
      }
    } else {
      setChosenPerks((prevChosen) => {
        const temp = [...prevChosen];
        temp[chosenSlot] = perk;
        return temp;
      });
    }

    setChosenSlot(-1);
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        px={35}
        py={10}
      >
        {chosenPerks.map((perk, index) => (
          <Box key={index}>
            {perk && (
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  border: "1px solid",
                  borderColor: chosenSlot === index ? "primary.main" : "white",
                  transform: "rotate(45deg)",
                  "&:hover": {
                    borderColor: "primary.dark",
                  },
                }}
              >
                <Box
                  component="img"
                  src={perk.image}
                  alt={`${perk.id} Image`}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "fill",
                    transform: "rotate(-45deg)",
                  }}
                  onClick={() => {
                    handleSlotChoice(index);
                  }}
                />
              </Box>
            )}
            {!perk && (
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: chosenSlot === index ? "primary.main" : "white",
                  width: 100,
                  height: 100,
                  transform: "rotate(45deg)",
                  objectFit: "contain",
                  "&:hover": {
                    borderColor: "primary.dark",
                  },
                }}
                onClick={() => {
                  handleSlotChoice(index);
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      <Box>
        <Button
          variant="outlined"
          sx={{ my: 5, mx: 2 }}
          onClick={() => setChosenPerks([null, null, null, null])}
        >
          Reset Perks
        </Button>
        <Button
          variant="outlined"
          sx={{ my: 5, mx: 2 }}
          onClick={() => {
            setData((prevData) => {
              return { ...prevData, perks: chosenPerks };
            });
            setStep(3);
          }}
        >
          Confirm Perks
        </Button>
      </Box>

      <Divider />

      {chosenSlot >= 0 && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          px={25}
          pt={10}
        >
          {perks.map((perk) => (
            <Box key={perk.id}>
              <Box
                component="img"
                src={perk.image}
                alt={`${perk.id} Image`}
                sx={{
                  width: 200,
                  height: 200,
                  objectFit: "contain",
                }}
                onClick={() => {
                  handlePerkChoice(perk);
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PerksChoice;
