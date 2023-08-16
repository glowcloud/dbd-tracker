import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";
import { Box, Divider } from "@mui/material";
import { paginate } from "../../utils/paginate";
import { handleMultiItemChoice } from "../../utils/addMatchUtils";
import ChoiceButtons from "./ChoiceButtons";
import ChoiceList from "./ChoiceList";
import MultiSlotChoice from "./MultiSlotChoice";

const KillerAddons = ({ killer, setStep, setData, data }) => {
  const [chosenAddons, setChosenAddons] = useState(
    data?.sideData?.addons?.length > 0 ? data.sideData.addons : [null, null]
  );
  const [chosenSlot, setChosenSlot] = useState(-1);
  const [addons, setAddons] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getAddons = async () => {
      const { data } = await supabase
        .from("killer_addons")
        .select(
          `id,
              name,
              image, 
              rarity: rarity_id ( id, created_at, name )
              `
        )
        .eq("killer_id", killer.id)
        .order("rarity(created_at)", { ascending: false });
      setAddons(data);
    };

    getAddons();
  }, [killer]);

  return (
    <Box>
      {/* ADDON SLOTS */}
      <MultiSlotChoice
        chosenItems={chosenAddons}
        chosenSlot={chosenSlot}
        setChosenSlot={setChosenSlot}
        setSearch={setSearch}
        setPage={setPage}
        customConSx={{ width: 150, height: 150 }}
        customImgSx={{ width: 150, height: 150 }}
      />

      {/* CONTROLS */}
      <ChoiceButtons
        resetText="Reset Addons"
        handleReset={() => setChosenAddons([null, null])}
        confirmText="Confirm Addons"
        handleConfirm={() => {
          setData((prevData) => {
            return {
              ...prevData,
              sideData: { ...prevData.sideData, addons: chosenAddons },
            };
          });
          setStep((prevStep) => prevStep + 1);
        }}
      />

      <Divider />

      {/* ADDONS */}
      {chosenSlot >= 0 && (
        <ChoiceList
          filteredChoices={paginate(
            addons.filter((addon) => addon.name.toLowerCase().includes(search)),
            10,
            page
          )}
          handleChoice={(choice) => {
            handleMultiItemChoice(
              choice,
              chosenSlot,
              setChosenSlot,
              chosenAddons,
              setChosenAddons
            );
          }}
          itemsCount={
            addons.filter((addon) => addon.name.toLowerCase().includes(search))
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
          }}
          customImgSx={{
            width: 100,
            height: 100,
          }}
        />
      )}
    </Box>
  );
};

export default KillerAddons;
