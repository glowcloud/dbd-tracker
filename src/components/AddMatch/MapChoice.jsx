import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";
import { Box, Button, TextField, Divider } from "@mui/material";
import { paginate } from "../../utils/paginate";
import { handleSingleItemChoice } from "../../utils/addMatchUtils";
import CustomPagination from "../CustomPagination";

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
      const { data } = await supabase.from("maps").select(
        `id,
        name, 
        image,
        realm: realm_id ( id, name )
        `
      );
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
        <Box
          sx={{
            width: 250,
            height: 200,
            border: "1px solid white",
            "&:hover": {
              borderColor: "primary.dark",
            },
          }}
          onClick={() => {
            setSearch("");
            setPage(0);
            setChoosing((prevChoosing) => !prevChoosing);
          }}
        >
          {chosenMap && (
            <Box
              component="img"
              src={chosenMap.image}
              alt={`${chosenMap.name} Image`}
              sx={{
                width: 250,
                height: 200,
                objectFit: "contain",
              }}
            />
          )}
        </Box>
      </Box>

      <Button
        variant="outlined"
        sx={{ my: 5, mx: 2 }}
        onClick={() => {
          setData((prevData) => {
            return { ...prevData, realmMap: chosenMap };
          });
          setStep((prevStep) => prevStep + 1);
        }}
      >
        Confirm Map
      </Button>

      <Divider />

      {/* MAPS */}
      {choosing && (
        <Box>
          {/* SEARCH BAR */}
          <Box
            component="form"
            autoComplete="off"
            px={40}
            py={5}
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              fullWidth
              label="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
            />
          </Box>

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
              <Box
                key={realmMap.id}
                sx={{
                  m: 5,
                  width: 250,
                  height: 200,
                  border: "1px solid white",
                  "&:hover": {
                    borderColor: "primary.dark",
                  },
                }}
                onClick={() => {
                  handleSingleItemChoice(
                    realmMap,
                    chosenMap,
                    setChosenMap,
                    setChoosing
                  );
                }}
              >
                <Box
                  component="img"
                  src={realmMap.image}
                  alt={`${realmMap.id} Image`}
                  sx={{
                    width: 250,
                    height: 200,
                    objectFit: "contain",
                  }}
                />
              </Box>
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
            itemsPerPage={10}
            page={page}
            setPage={setPage}
          />
        </Box>
      )}
    </Box>
  );
};

export default MapChoice;
