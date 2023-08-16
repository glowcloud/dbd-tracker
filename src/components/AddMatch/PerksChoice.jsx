import { Box, Button, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { supabase } from "../../data/supabaseClient";
import { paginate } from "../../utils/paginate";
import {
  handleSlotChoice,
  handleMultiItemChoice,
} from "../../utils/addMatchUtils";
import CustomPagination from "../CustomPagination";
import ImageSlot from "../ImageSlot";
import SearchBar from "./SearchBar";

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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        px={35}
        py={10}
      >
        {chosenPerks.map((perk, index) => (
          <ImageSlot
            key={index}
            data={perk}
            containerSx={{
              width: 100,
              height: 100,
              border: "1px solid",
              borderColor: chosenSlot === index ? "primary.main" : "white",
              transform: "rotate(45deg)",
              "&:hover": {
                borderColor: "primary.dark",
              },
            }}
            imageSx={{
              width: 100,
              height: 100,
              objectFit: "contain",
              transform: "rotate(-45deg)",
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
          onClick={() => setChosenPerks([null, null, null, null])}
        >
          Reset Perks
        </Button>
        <Button
          variant="outlined"
          sx={{ my: 5, mx: 2 }}
          onClick={() => {
            setData((prevData) => {
              return { ...prevData, perks: chosenPerks };
            });
            setStep((prevStep) => prevStep + 1);
          }}
        >
          Confirm Perks
        </Button>
      </Box>

      <Divider />

      {/* PERKS */}
      {chosenSlot >= 0 && (
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
              perks.filter((perk) => perk.name.toLowerCase().includes(search)),
              10,
              page
            ).map((perk) => (
              <ImageSlot
                key={perk.id}
                data={perk}
                containerSx={{
                  m: 5,
                  width: 100,
                  height: 100,
                  border: "1px solid white",
                  transform: "rotate(45deg)",
                  "&:hover": {
                    borderColor: "primary.dark",
                  },
                }}
                imageSx={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                  transform: "rotate(-45deg)",
                }}
                handleClick={() => {
                  handleMultiItemChoice(
                    perk,
                    chosenSlot,
                    setChosenSlot,
                    chosenPerks,
                    setChosenPerks
                  );
                }}
              />
            ))}
          </Box>

          <CustomPagination
            itemsCount={
              perks.filter((perk) => perk.name.toLowerCase().includes(search))
                .length
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

export default PerksChoice;
