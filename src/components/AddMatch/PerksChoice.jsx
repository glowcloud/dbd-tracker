import { Box, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { supabase } from "../../data/supabaseClient";
import { paginate } from "../../utils/paginate";
import { handleMultiItemChoice } from "../../utils/addMatchUtils";
import ChoiceButtons from "./ChoiceButtons";
import MultiSlotChoice from "./MultiSlotChoice";
import ChoiceList from "./ChoiceList";

const PerksChoice = ({ side, setStep, data, setData }) => {
  const [chosenPerks, setChosenPerks] = useState(
    data?.perks?.length > 0 ? data.perks : [null, null, null, null]
  );
  const [chosenSlot, setChosenSlot] = useState(-1);
  const [search, setSearch] = useState("");
  const [perks, setPerks] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getPerks = async () => {
      const { data } = await supabase
        .from("perks")
        .select()
        .eq("side", side)
        .order("name");
      setPerks(data);
    };

    getPerks();
  }, [side]);

  return (
    <Box>
      {/* PERK SLOTS */}
      <MultiSlotChoice
        chosenItems={chosenPerks}
        chosenSlot={chosenSlot}
        setChosenSlot={setChosenSlot}
        setSearch={setSearch}
        setPage={setPage}
        customConSx={{
          width: 100,
          height: 100,
          transform: "rotate(45deg)",
        }}
        customImgSx={{
          width: 100,
          height: 100,
          transform: "rotate(-45deg)",
        }}
      />

      {/* CONTROLS */}
      <ChoiceButtons
        resetText="Reset Perks"
        handleReset={() => setChosenPerks([null, null, null, null])}
        confirmText="Confirm Perks"
        handleConfirm={() => {
          setData((prevData) => {
            return { ...prevData, perks: chosenPerks };
          });
          setStep((prevStep) => prevStep + 1);
        }}
      />

      <Divider />

      {/* PERKS */}
      {chosenSlot >= 0 && (
        <ChoiceList
          filteredChoices={paginate(
            perks.filter((perk) => perk.name.toLowerCase().includes(search)),
            10,
            page
          )}
          handleChoice={(choice) => {
            handleMultiItemChoice(
              choice,
              chosenSlot,
              setChosenSlot,
              chosenPerks,
              setChosenPerks
            );
          }}
          itemsCount={
            perks.filter((perk) => perk.name.toLowerCase().includes(search))
              .length
          }
          itemsPerPage={10}
          search={search}
          setSearch={setSearch}
          page={page}
          setPage={setPage}
          customConSx={{
            width: 100,
            height: 100,
            transform: "rotate(45deg)",
          }}
          customImgSx={{
            width: 100,
            height: 100,
            transform: "rotate(-45deg)",
          }}
        />
      )}
    </Box>
  );
};

export default PerksChoice;
