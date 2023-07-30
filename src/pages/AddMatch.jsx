import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SideChoice from "../components/AddMatch/SideChoice";
import CharacterChoice from "../components/AddMatch/CharacterChoice";

import ControlButtons from "../components/AddMatch/ControlButtons";
import PerksChoice from "../components/AddMatch/PerksChoice";
import Survivors from "../components/AddMatch/Survivors";
import Killer from "../components/AddMatch/Killer";
import SurvivorStatus from "../components/AddMatch/SurvivorStatus";
import MatchResult from "../components/AddMatch/MatchResult";
import MapChoice from "../components/AddMatch/MapChoice";
import OfferingChoice from "../components/AddMatch/OfferingChoice";
import KillerAddons from "../components/AddMatch/KillerAddons";
import SurvivorItem from "../components/AddMatch/SurvivorItem";

/*
    KILLER STEPS
      1. character DONE
      2. perks DONE
      3. addons
      4. offering
      5. survivors DONE
      6. map
      7. match results DONE
      8. confirm info
    
    SURVIVOR STEPS
      1. character DONE
      2. perks DONE
      3. item + addons
      4. offering
      5. status DONE
      6. survivors PARTIALLY DONE (NO ITEMS)
      7. killer PARTIALLY DONE (NO ADDONS)
      8. map
      9. match results DONE
      10. confirm info
*/

const AddMatch = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    side: "",
    character: "",
    perks: [],
    offering: "",
    realmMap: null,
    result: "",
    survivors: [],
    sideData: {},
  });
  const navigate = useNavigate();

  const handleAddMatch = async () => {
    const matchData = {
      timestamp: Date.now().toString(),
      side: data.side,
      character: data.character,
      perks: data.perks,
      offering: data.offering,
      realmMap: data.realmMap,
      result: data.result,
      survivors: data.survivors,
      ...data.sideData,
    };

    const res = await fetch("http://localhost:3000/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(matchData),
    });

    console.log(res);

    navigate("/matches");
  };

  return (
    <Box textAlign="center">
      {/* STEP 0 - SIDE */}
      {step === 0 && <SideChoice setStep={setStep} setData={setData} />}

      {/* ------------- KILLER STEPS ------------- */}
      {/* STEP 1 - CHARACTER */}
      {step === 1 && data.side === "killer" && (
        <CharacterChoice side="killers" setStep={setStep} setData={setData} />
      )}

      {/* STEP 2 - PERKS */}
      {step === 2 && data.side === "killer" && (
        <PerksChoice
          side="killer"
          setStep={setStep}
          data={data}
          setData={setData}
        />
      )}

      {step === 3 && data.side === "killer" && (
        <KillerAddons
          killer={data.character}
          setStep={setStep}
          setData={setData}
          data={data}
        />
      )}

      {step === 4 && data.side === "killer" && (
        <OfferingChoice
          side="killer"
          setStep={setStep}
          setData={setData}
          data={data}
        />
      )}

      {/* STEP 5 - SURVIVORS */}
      {step === 5 && data.side === "killer" && (
        <Survivors
          side={data.side}
          setStep={setStep}
          setData={setData}
          data={data}
        />
      )}

      {step === 6 && data.side === "killer" && (
        <MapChoice setStep={setStep} setData={setData} data={data} />
      )}

      {/* STEP 7 - MATCH RESULT */}
      {step === 7 && data.side === "killer" && (
        <MatchResult setStep={setStep} setData={setData} />
      )}

      {/* STEP 8 - CONFIRM INFO - ADD MATCH FOR NOW */}
      {step === 8 && data.side === "killer" && (
        <Button sx={{ mt: 5 }} onClick={handleAddMatch}>
          Add Match
        </Button>
      )}

      {/* ------------- SURVIVOR STEPS ------------- */}
      {/* STEP 1 - CHARACTER */}
      {step === 1 && data.side === "survivor" && (
        <CharacterChoice side="survivors" setStep={setStep} setData={setData} />
      )}

      {/* STEP 2 - PERKS */}
      {step === 2 && data.side === "survivor" && (
        <PerksChoice
          side="survivor"
          setStep={setStep}
          data={data}
          setData={setData}
        />
      )}

      {step === 3 && data.side === "survivor" && (
        <SurvivorItem setStep={setStep} setData={setData} data={data} />
      )}

      {step === 4 && data.side === "survivor" && (
        <OfferingChoice
          side="survivor"
          setStep={setStep}
          setData={setData}
          data={data}
        />
      )}

      {/* STEP 5 - STATUS */}
      {step === 5 && data.side === "survivor" && (
        <SurvivorStatus setStep={setStep} setData={setData} />
      )}

      {/* STEP 6 - SURVIVORS */}
      {step === 6 && data.side === "survivor" && (
        <Survivors
          side={data.side}
          setStep={setStep}
          setData={setData}
          data={data}
        />
      )}

      {/* STEP 7 - KILLER */}
      {step === 7 && data.side === "survivor" && (
        <Killer setStep={setStep} setData={setData} data={data} />
      )}

      {step === 8 && data.side === "survivor" && (
        <MapChoice setStep={setStep} setData={setData} data={data} />
      )}

      {/* STEP 9 - MATCH RESULT */}
      {step === 9 && data.side === "survivor" && (
        <MatchResult setStep={setStep} setData={setData} />
      )}

      {/* STEP 10 - CONFIRM INFO - ADD MATCH FOR NOW */}
      {step === 10 && data.side === "survivor" && (
        <Button sx={{ mt: 5 }} onClick={handleAddMatch}>
          Add Match
        </Button>
      )}

      {/* CONTROL BUTTONS */}
      {step > 0 && <ControlButtons setStep={setStep} setData={setData} />}
    </Box>
  );
};

export default AddMatch;
