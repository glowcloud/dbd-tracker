import { Box } from "@mui/material";
import { useState } from "react";

import SideChoice from "../components/AddMatch/SideChoice";
import CharacterChoice from "../components/AddMatch/CharacterChoice";

import killers from "../assets/characters/killers";
import survivors from "../assets/characters/survivors";
import killerPerks from "../assets/perks/killer";
import survivorPerks from "../assets/perks/survivor";
import ControlButtons from "../components/AddMatch/ControlButtons";
import PerksChoice from "../components/AddMatch/PerksChoice";
import Opponents from "../components/AddMatch/Opponents";

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
      {/* STEP 0 - SIDE */}
      {step === 0 && <SideChoice setStep={setStep} setData={setData} />}

      {/* STEP 1 - CHARACTER */}
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

      {/* STEP 2 - PERKS */}
      {step === 2 && data.side === "killer" && (
        <PerksChoice
          perks={killerPerks}
          setStep={setStep}
          data={data}
          setData={setData}
        />
      )}

      {step === 2 && data.side === "survivor" && (
        <PerksChoice
          perks={survivorPerks}
          setStep={setStep}
          data={data}
          setData={setData}
        />
      )}

      {/* STEP 3 - ADDONS / ITEMS */}

      {/* STEP 4 - OFFERING */}

      {/* STEP 5 - MAP */}

      {/* STEP 6 - OPPONENTS */}
      {step === 3 && data.side === "killer" && (
        <Opponents
          side={data.side}
          characters={survivors}
          perks={survivorPerks}
          setStep={setStep}
          setData={setData}
        />
      )}
      {step === 3 && data.side === "survivor" && (
        <Opponents
          side={data.side}
          characters={killers}
          perks={killerPerks}
          setStep={setStep}
          setData={setData}
        />
      )}

      {/* STEP 7 - RESULTS */}

      {/* CONTROL BUTTONS */}
      {step > 0 && <ControlButtons setStep={setStep} setData={setData} />}
    </Box>
  );
};

export default AddMatch;
