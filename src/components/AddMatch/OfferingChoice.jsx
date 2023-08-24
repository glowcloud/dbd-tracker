import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";
import { Box, Divider, Typography } from "@mui/material";
import ChoiceButtons from "./ChoiceButtons";
import SingleSlotChoice from "./SingleSlotChoice";
import ChoiceList from "./ChoiceList";
import { handleSingleItemChoice } from "../../utils/addMatchUtils";
import { paginate } from "../../utils/paginate";

const OfferingChoice = ({ side, setStep, setData, data, addCharacter }) => {
  const [chosenOffering, setChosenOffering] = useState(
    data?.offering ? data.offering : null
  );
  const [offerings, setOfferings] = useState([]);
  const [choosing, setChoosing] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const getOfferings = async () => {
      const { data } = await supabase
        .from("offerings")
        .select(
          `id,
            name,
            image, 
            rarity: rarity_id ( id, created_at, name )
            `
        )
        .in("side", ["both", side])
        .order("rarity(created_at)", { ascending: false });
      setOfferings(data);
    };

    getOfferings();
  }, [side]);

  return (
    <Box>
      <Typography variant="h4" my={4}>
        {addCharacter ? "Choose the offering:" : "Choose your offering:"}
      </Typography>

      {/* OFFERING SLOT */}
      <SingleSlotChoice
        chosenItem={chosenOffering}
        choosing={choosing}
        handleClick={() => {
          setChoosing((prevChoosing) => !prevChoosing);
          setSearch("");
          setPage(0);
        }}
        customConSx={{
          width: 150,
          height: 150,
        }}
        customImgSx={{
          width: 150,
          height: 150,
        }}
      />

      <ChoiceButtons
        resetText="Reset Offering"
        handleReset={() => setChosenOffering(null)}
        confirmText="Confirm Offering"
        handleConfirm={() => {
          setData((prevData) => {
            return { ...prevData, offering: chosenOffering };
          });
          setStep((prevStep) => prevStep + 1);
        }}
      />

      <Divider />

      {/* OFFERINGS */}
      {choosing && (
        <ChoiceList
          filteredChoices={paginate(
            offerings.filter((offering) =>
              offering.name.toLowerCase().includes(search)
            ),
            10,
            page
          )}
          handleChoice={(choice) => {
            handleSingleItemChoice(
              choice,
              chosenOffering,
              setChosenOffering,
              setChoosing
            );
          }}
          itemsCount={
            offerings.filter((offering) =>
              offering.name.toLowerCase().includes(search)
            ).length
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

export default OfferingChoice;
