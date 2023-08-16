import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";
import { Box, Divider } from "@mui/material";
import { paginate } from "../../utils/paginate";
import { handleSingleItemChoice } from "../../utils/addMatchUtils";
import CustomPagination from "../CustomPagination";
import ImageSlot from "../ImageSlot";
import SearchBar from "./SearchBar";
import ChoiceButtons from "./ChoiceButtons";

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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={35}
        py={10}
      >
        <ImageSlot
          data={chosenMap}
          containerSx={{
            width: 250,
            height: 200,
            border: "1px solid",
            borderColor: choosing ? "primary.main" : "white",
            "&:hover": {
              borderColor: "primary.dark",
            },
          }}
          imageSx={{
            width: 250,
            height: 200,
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
              maps.filter(
                (realmMap) =>
                  realmMap.name.toLowerCase().includes(search) ||
                  realmMap.realm.name.toLowerCase().includes(search)
              ),
              6,
              page
            ).map((realmMap) => (
              <ImageSlot
                key={realmMap.id}
                data={realmMap}
                containerSx={{
                  m: 5,
                  width: 250,
                  height: 200,
                  border: "1px solid white",
                  "&:hover": {
                    borderColor: "primary.dark",
                  },
                }}
                imageSx={{
                  width: 250,
                  height: 200,
                  objectFit: "contain",
                }}
                handleClick={() => {
                  handleSingleItemChoice(
                    realmMap,
                    chosenMap,
                    setChosenMap,
                    setChoosing
                  );
                }}
              />
            ))}
          </Box>

          <CustomPagination
            itemsCount={
              maps.filter(
                (realmMap) =>
                  realmMap.name.toLowerCase().includes(search) ||
                  realmMap.realm.name.toLowerCase().includes(search)
              ).length
            }
            itemsPerPage={6}
            page={page}
            setPage={setPage}
          />
        </Box>
      )}
    </Box>
  );
};

export default MapChoice;
