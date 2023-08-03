import { Button } from "@mui/material";
import CharacterChoice from "./CharacterChoice";
import PerksChoice from "./PerksChoice";
import SurvivorItem from "./SurvivorItem";
import OfferingChoice from "./OfferingChoice";
import SurvivorStatus from "./SurvivorStatus";
import Survivors from "./Survivors";
import Killer from "./Killer";
import MapChoice from "./MapChoice";
import MatchResult from "./MatchResult";

const SurvivorSteps = ({ step, setStep, data, setData, addMatch }) => {
  return (
    <>
      {/* STEP 1 - CHARACTER */}
      {step === 1 && (
        <CharacterChoice side="survivors" setStep={setStep} setData={setData} />
      )}

      {/* STEP 2 - PERKS */}
      {step === 2 && (
        <PerksChoice
          side="survivor"
          setStep={setStep}
          data={data}
          setData={setData}
        />
      )}

      {step === 3 && (
        <SurvivorItem setStep={setStep} setData={setData} data={data} />
      )}

      {step === 4 && (
        <OfferingChoice
          side="survivor"
          setStep={setStep}
          setData={setData}
          data={data}
        />
      )}

      {/* STEP 5 - STATUS */}
      {step === 5 && <SurvivorStatus setStep={setStep} setData={setData} />}

      {/* STEP 6 - SURVIVORS */}
      {step === 6 && (
        <Survivors
          side={data.side}
          setStep={setStep}
          setData={setData}
          data={data}
        />
      )}

      {/* STEP 7 - KILLER */}
      {step === 7 && <Killer setStep={setStep} setData={setData} data={data} />}

      {step === 8 && (
        <MapChoice setStep={setStep} setData={setData} data={data} />
      )}

      {/* STEP 9 - MATCH RESULT */}
      {step === 9 && <MatchResult setStep={setStep} setData={setData} />}

      {/* STEP 10 - CONFIRM INFO - ADD MATCH FOR NOW */}
      {step === 10 && (
        <Button sx={{ mt: 5 }} onClick={addMatch}>
          Add Match
        </Button>
      )}
    </>
  );
};

export default SurvivorSteps;
