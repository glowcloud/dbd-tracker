import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SideChoice from "../components/SideChoice";
import ControlButtons from "../components/AddMatch/ControlButtons";

import { useAuth } from "../hooks/useAuth";
import { handleAddMatch } from "../utils/addMatchUtils";
import KillerSteps from "../components/AddMatch/KillerSteps";
import SurvivorSteps from "../components/AddMatch/SurvivorSteps";

const AddMatch = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    side: "",
    character: null,
    perks: [],
    offering: null,
    realmMap: null,
    result: null,
    survivors: [],
    sideData: {},
  });
  const navigate = useNavigate();
  const { session } = useAuth();

  const addMatch = async () => {
    const error = await handleAddMatch(data, session);
    if (!error) {
      navigate("/matches");
    } else {
      // HANDLE ERRORS
    }
  };

  return (
    <Box textAlign="center">
      {/* STEP 0 - SIDE */}
      {step === 0 && (
        <SideChoice
          handleSurvivorChoice={() => {
            setData((prevData) => {
              return {
                ...prevData,
                side: "survivor",
                sideData: {
                  item: null,
                  status: "",
                  killer: null,
                },
              };
            });
            setStep((prevStep) => prevStep + 1);
          }}
          handleKillerChoice={() => {
            setData((prevData) => {
              return {
                ...prevData,
                side: "killer",
                sideData: { addons: [] },
              };
            });
            setStep((prevStep) => prevStep + 1);
          }}
        />
      )}

      {/* ------------- KILLER STEPS ------------- */}
      {step > 0 && data.side === "killer" && (
        <KillerSteps
          step={step}
          setStep={setStep}
          data={data}
          setData={setData}
          addMatch={addMatch}
        />
      )}

      {/* ------------- SURVIVOR STEPS ------------- */}
      {step > 0 && data.side === "survivor" && (
        <SurvivorSteps
          step={step}
          setStep={setStep}
          data={data}
          setData={setData}
          addMatch={addMatch}
        />
      )}

      {/* CONTROL BUTTONS */}
      {step > 0 && <ControlButtons setStep={setStep} setData={setData} />}
    </Box>
  );
};

export default AddMatch;
