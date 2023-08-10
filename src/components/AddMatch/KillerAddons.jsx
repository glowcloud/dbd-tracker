import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";
import { Box, Button, Divider, TextField } from "@mui/material";
import { paginate } from "../../utils/paginate";
import {
  handleSlotChoice,
  handleMultiItemChoice,
} from "../../utils/addMatchUtils";
import CustomPagination from "../CustomPagination";
import ImageSlot from "../ImageSlot";

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
        .eq("killer_id", killer.id);
      setAddons(data);
    };

    getAddons();
  }, [killer]);

  return (
    <Box>
      {/* ADDON SLOTS */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={35}
        py={10}
      >
        {chosenAddons.map((addon, index) => (
          <ImageSlot
            key={index}
            data={addon}
            containerSx={{
              mx: 5,
              width: 150,
              height: 150,
              border: "1px solid",
              borderColor: chosenSlot === index ? "primary.main" : "white",
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
              handleSlotChoice(
                index,
                chosenSlot,
                setChosenSlot,
                setSearch,
                setPage
              );
            }}
          />
        ))}
      </Box>

      {/* CONTROLS */}
      <Box>
        <Button
          variant="outlined"
          sx={{ my: 5, mx: 2 }}
          onClick={() => setChosenAddons([null, null])}
        >
          Reset Addons
        </Button>
        <Button
          variant="outlined"
          sx={{ my: 5, mx: 2 }}
          onClick={() => {
            setData((prevData) => {
              return {
                ...prevData,
                sideData: { ...prevData.sideData, addons: chosenAddons },
              };
            });
            setStep((prevStep) => prevStep + 1);
          }}
        >
          Confirm Addons
        </Button>
      </Box>

      <Divider />

      {/* ADDONS */}
      {chosenSlot >= 0 && (
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
              addons.filter((addon) =>
                addon.name.toLowerCase().includes(search)
              ),
              10,
              page
            ).map((addon) => (
              <ImageSlot
                key={addon.id}
                data={addon}
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
                  handleMultiItemChoice(
                    addon,
                    chosenSlot,
                    setChosenSlot,
                    chosenAddons,
                    setChosenAddons
                  );
                }}
              />
            ))}
          </Box>

          <CustomPagination
            itemsCount={
              addons.filter((addon) =>
                addon.name.toLowerCase().includes(search)
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

export default KillerAddons;
