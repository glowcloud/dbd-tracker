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

import { useAuth } from "../hooks/useAuth";
import { supabase } from "../data/supabaseClient";

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

  const handleAddSurvivor = async (survivor, isPlayer, userId) => {
    if (survivor) {
      const { data, error } = await supabase
        .from("match_survivors")
        .insert({
          survivor_id: survivor.character.id,
          item_id: survivor.item?.item?.id ? survivor.item.item.id : null,
          addon_1_id: survivor.item?.addons[0]?.id
            ? survivor.item.addons[0].id
            : null,
          addon_2_id: survivor.item?.addons[1]?.id
            ? survivor.item.addons[1].id
            : null,
          offering_id: survivor.offering?.id ? survivor.offering.id : null,
          perk_1_id: survivor.perks[0]?.id ? survivor.perks[0].id : null,
          perk_2_id: survivor.perks[1]?.id ? survivor.perks[1].id : null,
          perk_3_id: survivor.perks[2]?.id ? survivor.perks[2].id : null,
          perk_4_id: survivor.perks[3]?.id ? survivor.perks[3].id : null,
          player: isPlayer,
          escaped:
            survivor.status === ""
              ? null
              : survivor.status === "escaped"
              ? true
              : false,
          user_id: userId,
        })
        .select("id");
      if (!error) {
        return data[0].id;
      }
    }
    return null;
  };

  const handleAddKiller = async (killer, isPlayer, userId) => {
    if (killer) {
      const { data, error } = await supabase
        .from("match_killers")
        .insert({
          killer_id: killer.character.id,
          addon_1_id: killer.addons[0]?.id ? killer.addons[0].id : null,
          addon_2_id: killer.item?.addons[1]?.id ? killer.addons[1].id : null,
          offering_id: killer.offering?.id ? killer.offering.id : null,
          perk_1_id: killer.perks[0]?.id ? killer.perks[0].id : null,
          perk_2_id: killer.perks[1]?.id ? killer.perks[1].id : null,
          perk_3_id: killer.perks[2]?.id ? killer.perks[2].id : null,
          perk_4_id: killer.perks[3]?.id ? killer.perks[3].id : null,
          player: isPlayer,
          user_id: userId,
        })
        .select("id");
      if (!error) {
        return data[0].id;
      }
    }
    return null;
  };

  const handleAddMatch = async () => {
    const matchData = {
      side: data.side,
      character: data.character,
      perks: data.perks,
      offering: data.offering,
      realmMap: data.realmMap,
      result: data.result,
      survivors: data.survivors,
      ...data.sideData,
    };

    // ADD KILLER
    let killerId = null;
    if (matchData.side === "survivor") {
      killerId = await handleAddKiller(
        matchData.killer,
        false,
        session.user.id
      );
    } else {
      killerId = await handleAddKiller(
        {
          character: matchData.character,
          perks: matchData.perks,
          addons: matchData.addons,
          offering: matchData.offering,
        },
        false,
        session.user.id
      );
    }

    // ADD SURVIVORS
    const survivorIds = [];

    // PLAYER SURVIVOR
    let survivorId = null;
    if (matchData.side === "survivor") {
      survivorId = await handleAddSurvivor(
        {
          character: matchData.character,
          perks: matchData.perks,
          item: matchData.item,
          offering: matchData.offering,
          status: matchData.status,
        },
        true,
        session.user.id
      );
      survivorIds.push(survivorId);
    }

    // OTHER SURVIVORS
    for (const survivor of matchData.survivors) {
      const id = await handleAddSurvivor(survivor, false, session.user.id);
      survivorIds.push(id);
    }

    console.log(killerId, survivorIds);

    const { error } = await supabase.from("matches").insert({
      killer_id: killerId,
      survivor_1_id: survivorIds[0],
      survivor_2_id: survivorIds[1],
      survivor_3_id: survivorIds[2],
      survivor_4_id: survivorIds[3],
      side: matchData.side,
      map_id: matchData.realmMap?.id ? matchData.realmMap.id : null,
      result: matchData.result,
      user_id: session.user.id,
    });
    if (error) {
      console.log(error);
    }

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
