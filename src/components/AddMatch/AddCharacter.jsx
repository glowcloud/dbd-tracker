import { useState } from "react";
import { Modal, Box } from "@mui/material";
import CharacterChoice from "./CharacterChoice";
import PerksChoice from "./PerksChoice";
import KillerAddons from "./KillerAddons";
import SurvivorItem from "./SurvivorItem";
import OfferingChoice from "./OfferingChoice";
import AddCharacterSummary from "./AddCharacterSummary";

const AddCharacter = ({
  open,
  handleClose,
  characterType,
  handleAddCharacter,
}) => {
  const [character, setCharacter] = useState(
    characterType === "killer"
      ? {
          character: null,
          perks: [],
          offering: null,
          sideData: {},
        }
      : {
          character: null,
          perks: [],
          offering: null,
          sideData: {},
          status: "",
        }
  );
  const [step, setStep] = useState(0);

  const handleReset = () => {
    setStep(0);
    setCharacter(
      characterType === "killer"
        ? {
            character: null,
            perks: [],
            addons: [],
            offering: null,
            status: "",
          }
        : {
            character: null,
            perks: [],
            item: null,
            offering: null,
            status: "",
          }
    );
  };

  const handleAdd = () => {
    handleAddCharacter(character);
    handleReset();
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleReset();
        handleClose();
      }}
    >
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
          textAlign: "center",
        }}
      >
        {/* CHARACTER */}
        {step === 0 && (
          <CharacterChoice
            side={`${characterType}s`}
            setStep={setStep}
            setData={setCharacter}
          />
        )}

        {/* PERKS */}
        {step === 1 && (
          <PerksChoice
            side={characterType}
            setStep={setStep}
            data={character}
            setData={setCharacter}
          />
        )}

        {/* KILLER: ADDONS */}
        {step === 2 && characterType === "killer" && (
          <KillerAddons
            killer={character.character}
            setStep={setStep}
            data={character}
            setData={setCharacter}
          />
        )}

        {/* SURVIVOR: ITEM */}
        {step === 2 && characterType === "survivor" && (
          <SurvivorItem
            setStep={setStep}
            data={character}
            setData={setCharacter}
          />
        )}

        {/* OFFERING */}
        {step === 3 && (
          <OfferingChoice
            side={characterType}
            setStep={setStep}
            data={character}
            setData={setCharacter}
          />
        )}

        {/* SUMMARY AND STATUS */}
        {step === 4 && (
          <AddCharacterSummary
            character={character}
            setCharacter={setCharacter}
            characterType={characterType}
            handleReset={handleReset}
            handleAdd={handleAdd}
          />
        )}
      </Box>
    </Modal>
  );
};

export default AddCharacter;
