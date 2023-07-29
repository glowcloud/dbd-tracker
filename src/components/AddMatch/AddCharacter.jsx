import { useState } from "react";
import {
  Modal,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CharacterChoice from "./CharacterChoice";
import PerksChoice from "./PerksChoice";

const AddCharacter = ({
  open,
  handleClose,
  characterType,
  handleAddCharacter,
}) => {
  const [character, setCharacter] = useState({
    character: {},
    perks: [],
    status: "",
  });
  const [step, setStep] = useState(0);

  const handleAdd = () => {
    handleAddCharacter(character);
    setStep(0);
    setCharacter({});
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1200,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          overflow: "auto",
          height: "90%",
        }}
      >
        {step === 0 && (
          <CharacterChoice
            side={`${characterType}s`}
            setStep={setStep}
            setData={setCharacter}
          />
        )}
        {step === 1 && (
          <PerksChoice
            side={characterType}
            setStep={setStep}
            data={character}
            setData={setCharacter}
          />
        )}
        {step === 2 && (
          <Box>
            <Box mx={5} display="flex">
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  border: "1px solid white",
                }}
              >
                <Box
                  component="img"
                  src={character.character.image}
                  alt={`${character.character.id} Image`}
                  sx={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                  }}
                />
              </Box>
              {character.perks.map((perk, perkIndex) => (
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

            {characterType === "survivor" && (
              <Box my={10} px={40}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={character.status}
                    label="Status"
                    onChange={(e) =>
                      setCharacter((prevCharacter) => {
                        return { ...prevCharacter, status: e.target.value };
                      })
                    }
                  >
                    <MenuItem value="escaped">Escaped</MenuItem>
                    <MenuItem value="killed">Killed</MenuItem>
                    <MenuItem value="disconnected">Disconnected</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            <Box textAlign="center">
              <Button
                onClick={() => {
                  setCharacter({});
                  setStep(0);
                }}
              >
                Reset
              </Button>
              <Button onClick={handleAdd}>Confirm</Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default AddCharacter;
