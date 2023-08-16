import { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import { supabase } from "../../data/supabaseClient";
import { paginate } from "../../utils/paginate";
import { handleSingleItemChoice } from "../../utils/addMatchUtils";
import ChoiceButtons from "./ChoiceButtons";
import ChoiceList from "./ChoiceList";
import SingleSlotChoice from "./SingleSlotChoice";

const MapChoice = ({ setStep, setData, data }) => {
  const [chosenMap, setChosenMap] = useState(
    data?.realmMap ? data.realmMap : null
  );
  const [maps, setMaps] = useState([]);
  const [choosing, setChoosing] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getMaps = async () => {
      const { data } = await supabase
        .from("maps")
        .select(
          `id,
        name, 
        image,
        realm: realm_id ( id, created_at, name )
        `
        )
        .order("realm(created_at)");
      console.log(data);
      setMaps(data);
    };

    getMaps();
  }, []);

  return (
    <Box>
      {/* MAP SLOT */}
      <SingleSlotChoice
        chosenItem={chosenMap}
        choosing={choosing}
        handleClick={() => {
          setChoosing((prevChoosing) => !prevChoosing);
          setSearch("");
          setPage(0);
        }}
        customConSx={{
          width: 250,
          height: 200,
        }}
        customImgSx={{
          width: 250,
          height: 200,
        }}
      />

      <ChoiceButtons
        resetText="Reset Map"
        handleReset={() => setChosenMap(null)}
        confirmText="Confirm Map"
        handleConfirm={() => {
          setData((prevData) => {
            return { ...prevData, realmMap: chosenMap };
          });
          setStep((prevStep) => prevStep + 1);
        }}
      />

      <Divider />

      {/* MAPS */}
      {choosing && (
        <ChoiceList
          filteredChoices={paginate(
            maps.filter(
              (realmMap) =>
                realmMap.name.toLowerCase().includes(search) ||
                realmMap.realm.name.toLowerCase().includes(search)
            ),
            6,
            page
          )}
          handleChoice={(choice) => {
            handleSingleItemChoice(
              choice,
              chosenMap,
              setChosenMap,
              setChoosing
            );
          }}
          itemsCount={
            maps.filter(
              (realmMap) =>
                realmMap.name.toLowerCase().includes(search) ||
                realmMap.realm.name.toLowerCase().includes(search)
            ).length
          }
          itemsPerPage={6}
          search={search}
          setSearch={setSearch}
          page={page}
          setPage={setPage}
          customConSx={{
            width: 250,
            height: 200,
          }}
          customImgSx={{
            width: 250,
            height: 200,
          }}
        />
      )}
    </Box>
  );
};

export default MapChoice;
