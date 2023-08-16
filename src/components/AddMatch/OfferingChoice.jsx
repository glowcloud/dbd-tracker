import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";
import { Box, Divider } from "@mui/material";
import { paginate } from "../../utils/paginate";
import { handleSingleItemChoice } from "../../utils/addMatchUtils";
import CustomPagination from "../CustomPagination";
import ImageSlot from "../ImageSlot";
import SearchBar from "./SearchBar";
import ChoiceButtons from "./ChoiceButtons";

const OfferingChoice = ({ side, setStep, setData, data }) => {
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
      {/* OFFERING SLOT */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={35}
        py={10}
      >
        <ImageSlot
          data={chosenOffering}
          containerSx={{
            width: 150,
            height: 150,
            border: "1px solid",
            borderColor: choosing ? "primary.main" : "white",
            "&:hover": {
              borderColor: "primary.dark",
            },
          }}
          imageSx={{
            width: 150,
            height: 150,
            objectFit: "contain",
          }}
          handleClick={() => {
            setChoosing((prevChoosing) => !prevChoosing);
            setSearch("");
            setPage(0);
          }}
        />
      </Box>

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
        <Box>
          {/* SEARCH BAR */}
          <SearchBar search={search} setSearch={setSearch} setPage={setPage} />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            px={25}
          >
            {paginate(
              offerings.filter((offering) =>
                offering.name.toLowerCase().includes(search)
              ),
              10,
              page
            ).map((offering) => (
              <ImageSlot
                key={offering.id}
                data={offering}
                containerSx={{
                  m: 5,
                  width: 100,
                  height: 100,
                  border: "1px solid white",
                  "&:hover": {
                    borderColor: "primary.dark",
                  },
                }}
                imageSx={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                }}
                handleClick={() => {
                  handleSingleItemChoice(
                    offering,
                    chosenOffering,
                    setChosenOffering,
                    setChoosing
                  );
                }}
              />
            ))}
          </Box>

          <CustomPagination
            itemsCount={
              offerings.filter((offering) =>
                offering.name.toLowerCase().includes(search)
              ).length
            }
            itemsPerPage={10}
            page={page}
            setPage={setPage}
          />
        </Box>
      )}
    </Box>
  );
};

export default OfferingChoice;
