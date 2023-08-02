import { Box, Button, Divider, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { supabase } from "../../data/supabaseClient";
import { paginate } from "../../utils/paginate";
import CustomPagination from "../CustomPagination";

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
      const { data } = await supabase.from("perks").select().eq("side", side);
      setPerks(data);
    };

    getPerks();
  }, [side]);

  const handleSlotChoice = (index) => {
    setPage(0);
    setSearch("");
    if (chosenSlot !== index) {
      setChosenSlot(index);
    } else {
      setChosenSlot(-1);
    }
  };

  const handlePerkChoice = (perk) => {
    if (chosenPerks.includes(perk)) {
      if (chosenPerks[chosenSlot] && chosenPerks[chosenSlot].id === perk.id) {
        setChosenPerks((prevChosen) => {
          const temp = [...prevChosen];
          temp[chosenSlot] = null;
          return temp;
        });
      } else {
        const indexOfPerk = chosenPerks.indexOf(perk);
        setChosenPerks((prevChosen) => {
          const temp = [...prevChosen];
          temp[indexOfPerk] = temp[chosenSlot];
          temp[chosenSlot] = perk;
          return temp;
        });
      }
    } else {
      setChosenPerks((prevChosen) => {
        const temp = [...prevChosen];
        temp[chosenSlot] = perk;
        return temp;
      });
    }

    setChosenSlot(-1);
  };

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
          <Box
            key={index}
            sx={{
              width: 100,
              height: 100,
              border: "1px solid",
              borderColor: chosenSlot === index ? "primary.main" : "white",
              transform: "rotate(45deg)",
              "&:hover": {
                borderColor: "primary.dark",
              },
            }}
            onClick={() => {
              handleSlotChoice(index);
            }}
          >
            {perk && (
              <Box
                component="img"
                src={perk.image}
                alt={`${perk.name} Image`}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                  transform: "rotate(-45deg)",
                }}
              />
            )}
          </Box>
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
              perks.filter((perk) => perk.name.toLowerCase().includes(search)),
              10,
              page
            ).map((perk) => (
              <Box
                key={perk.id}
                sx={{
                  m: 5,
                  width: 100,
                  height: 100,
                  border: "1px solid white",
                  transform: "rotate(45deg)",
                  "&:hover": {
                    borderColor: "primary.dark",
                  },
                }}
                onClick={() => {
                  handlePerkChoice(perk);
                }}
              >
                <Box
                  component="img"
                  src={perk.image}
                  alt={`${perk.id} Image`}
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: "contain",
                    transform: "rotate(-45deg)",
                  }}
                />
              </Box>
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
