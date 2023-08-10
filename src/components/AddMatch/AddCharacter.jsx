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
import KillerAddons from "./KillerAddons";
import SurvivorItem from "./SurvivorItem";
import OfferingChoice from "./OfferingChoice";
import CharacterRow from "../Matches/CharacterRow";

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

  const handleAdd = () => {
    handleAddCharacter(character);
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
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
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
          <Box>
            <CharacterRow
              data={{
                ...character,
                item: character?.sideData.item?.item
                  ? character.sideData.item.item
                  : null,
                addons:
                  characterType === "survivor"
                    ? character?.sideData.item?.addons
                      ? character.sideData.item.addons
                      : null
                    : character?.sideData?.addons
                    ? character.sideData.addons
                    : null,
              }}
              player={false}
              side={characterType}
              noResult
            />

            {/* STATUS - SURVIVORS */}
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
                  </Select>
                </FormControl>
              </Box>
            )}

            <Box textAlign="center">
              <Button
                onClick={() => {
                  setCharacter(
                    characterType === "killer"
                      ? {
                          character: null,
                          perks: [],
                          addons: [],
                          offering: null,
                        }
                      : {
                          character: null,
                          perks: [],
                          item: null,
                          offering: null,
                          status: null,
                        }
                  );
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
