import { Button } from "@mui/material";
import CharacterChoice from "./CharacterChoice";
import PerksChoice from "./PerksChoice";
import KillerAddons from "./KillerAddons";
import OfferingChoice from "./OfferingChoice";
import Survivors from "./Survivors";
import MapChoice from "./MapChoice";
import MatchResult from "./MatchResult";

const KillerSteps = ({ step, setStep, data, setData, addMatch }) => {
  return (
    <>
      {/* STEP 1 - CHARACTER */}
      {step === 1 && (
        <CharacterChoice side="killers" setStep={setStep} setData={setData} />
      )}

      {/* STEP 2 - PERKS */}
      {step === 2 && (
        <PerksChoice
          side="killer"
          setStep={setStep}
          data={data}
          setData={setData}
        />
      )}

      {/* STEP 3 - ADDONS */}
      {step === 3 && (
        <KillerAddons
          killer={data.character}
          setStep={setStep}
          setData={setData}
          data={data}
        />
      )}

      {/* STEP 4 - OFFERING */}
      {step === 4 && (
        <OfferingChoice
          side="killer"
          setStep={setStep}
          setData={setData}
          data={data}
        />
      )}

      {/* STEP 5 - SURVIVORS */}
      {step === 5 && (
        <Survivors
          side={data.side}
          setStep={setStep}
          setData={setData}
          data={data}
        />
      )}

      {/* STEP 6 - MAP */}
      {step === 6 && (
        <MapChoice setStep={setStep} setData={setData} data={data} />
      )}

      {/* STEP 7 - MATCH RESULT */}
      {step === 7 && <MatchResult setStep={setStep} setData={setData} />}

      {/* STEP 8 - CONFIRM INFO - ADD MATCH FOR NOW */}
      {step === 8 && (
        <Button sx={{ mt: 5 }} onClick={addMatch}>
          Add Match
        </Button>
      )}
    </>
  );
};

export default KillerSteps;
