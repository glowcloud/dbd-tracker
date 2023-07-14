import { Box } from "@mui/material";
import { useState } from "react";

import SideChoice from "../components/AddMatch/SideChoice";
import CharacterChoice from "../components/AddMatch/CharacterChoice";

import killers from "../assets/characters/killers";
import survivors from "../assets/characters/survivors";
import ControlButtons from "../components/AddMatch/ControlButtons";

const AddMatch = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    side: "",
    character: "",
    perks: [],
    offering: "",
    map: {},
    result: "",
    sideData: {},
  });

  return (
    <Box textAlign="center">
      {/* STEP 0 - CHOOSE YOUR SIDE */}
      {step === 0 && <SideChoice setStep={setStep} setData={setData} />}

      {/* STEP 1 - CHOOSE YOUR CHARACTER */}
      {step === 1 && data.side === "killer" && (
        <CharacterChoice
          characters={killers}
          setStep={setStep}
          setData={setData}
        />
      )}
      {step === 1 && data.side === "survivor" && (
        <CharacterChoice
          characters={survivors}
          setStep={setStep}
          setData={setData}
        />
      )}

      {/* CONTROL BUTTONS */}
      {step > 0 && <ControlButtons setStep={setStep} setData={setData} />}
    </Box>
  );
};

export default AddMatch;
