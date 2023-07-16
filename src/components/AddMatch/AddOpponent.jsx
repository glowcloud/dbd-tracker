import { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import CharacterChoice from "./CharacterChoice";
import PerksChoice from "./PerksChoice";

const AddOpponent = ({
  open,
  handleClose,
  characters,
  perks,
  opponentIndex,
  setOpponents,
}) => {
  const [opponent, setOpponent] = useState({});
  const [step, setStep] = useState(0);

  console.log(opponentIndex)

  const handleAdd = () => {
    setOpponents((prevOpponents) => {
      const temp = [...prevOpponents];
      temp[opponentIndex] = opponent;
      return temp;
    });
    setStep(0);
    setOpponent({});
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
            characters={characters}
            setStep={setStep}
            setData={setOpponent}
          />
        )}
        {step === 1 && (
          <PerksChoice
            perks={perks}
            setStep={setStep}
            data={opponent}
            setData={setOpponent}
          />
        )}
        {step === 2 && (
          <Box>
            <Box>{JSON.stringify(opponent)}</Box>
            <Box>
              <Button onClick={() => setStep(0)}>Reset</Button>
              <Button onClick={handleAdd}>Confirm</Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default AddOpponent;
