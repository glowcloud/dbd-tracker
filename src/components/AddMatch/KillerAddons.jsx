import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";
import { Box, Button, Divider, TextField } from "@mui/material";

const KillerAddons = ({ killer, setStep, setData, data }) => {
  const [chosenAddons, setChosenAddons] = useState(
    data?.addons?.length > 0 ? data.addons : [null, null]
  );
  const [chosenSlot, setChosenSlot] = useState(-1);
  const [addons, setAddons] = useState([]);
  const [search, setSearch] = useState("");

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

  const handleSlotChoice = (index) => {
    if (chosenSlot !== index) {
      setChosenSlot(index);
    } else {
      setChosenSlot(-1);
    }
  };

  const handleAddonChoice = (addon) => {
    if (chosenAddons.includes(addon)) {
      if (
        chosenAddons[chosenSlot] &&
        chosenAddons[chosenSlot].id === addon.id
      ) {
        setChosenAddons((prevChosen) => {
          const temp = [...prevChosen];
          temp[chosenSlot] = null;
          return temp;
        });
      } else {
        const indexOfAddon = chosenAddons.indexOf(addon);
        setChosenAddons((prevChosen) => {
          const temp = [...prevChosen];
          temp[indexOfAddon] = temp[chosenSlot];
          temp[chosenSlot] = addon;
          return temp;
        });
      }
    } else {
      setChosenAddons((prevChosen) => {
        const temp = [...prevChosen];
        temp[chosenSlot] = addon;
        return temp;
      });
    }

    setChosenSlot(-1);
  };

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
          <Box
            key={index}
            sx={{
              mx: 5,
              width: 150,
              height: 150,
              border: "1px solid",
              borderColor: chosenSlot === index ? "primary.main" : "white",
              "&:hover": {
                borderColor: "primary.dark",
              },
            }}
            onClick={() => {
              handleSlotChoice(index);
            }}
          >
            {addon && (
              <Box
                component="img"
                src={addon.image}
                alt={`${addon.name} Image`}
                sx={{
                  width: 150,
                  height: 150,
                  objectFit: "contain",
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
          onClick={() => setChosenAddons([null, null, null, null])}
        >
          Reset Addons
        </Button>
        <Button
          variant="outlined"
          sx={{ my: 5, mx: 2 }}
          onClick={() => {
            setData((prevData) => {
              return { ...prevData, addons: chosenAddons };
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
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            px={25}
          >
            {addons
              .filter((addon) => addon.name.toLowerCase().includes(search))
              .map((addon) => (
                <Box
                  key={addon.id}
                  sx={{
                    m: 5,
                    width: 100,
                    height: 100,
                    border: "1px solid white",
                    "&:hover": {
                      borderColor: "primary.dark",
                    },
                  }}
                  onClick={() => {
                    handleAddonChoice(addon);
                  }}
                >
                  <Box
                    component="img"
                    src={addon.image}
                    alt={`${addon.id} Image`}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default KillerAddons;
