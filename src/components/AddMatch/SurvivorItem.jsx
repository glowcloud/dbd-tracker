import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";
import { Box, Button, TextField, Divider } from "@mui/material";

const SurvivorItem = ({ setStep, setData, data }) => {
  const [chosenItem, setChosenItem] = useState(
    data?.item?.item ? data.item.item : null
  );
  const [chosenAddons, setChosenAddons] = useState(
    data?.item?.addons?.length > 0 ? data.item.addons : [null, null]
  );
  const [itemChoosing, setItemChoosing] = useState(false);
  const [chosenSlot, setChosenSlot] = useState(-1);
  const [items, setItems] = useState([]);
  const [addons, setAddons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getItems = async () => {
      const { data } = await supabase.from("items").select(
        `id,
              name,
              image, 
              rarity: rarity_id ( id, created_at, name ), 
              category: category_id (id, name)
              `
      );
      setItems(data);
    };

    const getAddons = async () => {
      const { data } = await supabase.from("item_addons").select(
        `id,
              name,
              image, 
              rarity: rarity_id ( id, created_at, name ), 
              category: category_id (id, name)
              `
      );
      setAddons(data);
    };

    getItems();
    getAddons();
  }, []);

  const handleItemChoice = (item) => {
    if (chosenItem?.id === item.id) {
      setChosenItem(null);
      setChosenAddons([null, null]);
    } else {
      setChosenItem(item);
      setChosenAddons([null, null]);
    }
    setItemChoosing(false);
  };

  const handleSlotChoice = (index) => {
    if (chosenSlot !== index) {
      setItemChoosing(false);
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
      {/* ITEM AND ADDONS SLOTS */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={35}
        py={10}
      >
        {/* ITEM */}
        <Box
          sx={{
            mx: 2,
            width: 200,
            height: 200,
            border: "1px solid white",
            "&:hover": {
              borderColor: "primary.dark",
            },
          }}
          onClick={() => {
            setChosenSlot(-1);
            setItemChoosing((prevChoosing) => !prevChoosing);
          }}
        >
          {chosenItem && (
            <Box
              component="img"
              src={chosenItem.image}
              alt={`${chosenItem.name} Image`}
              sx={{
                width: 200,
                height: 200,
                objectFit: "contain",
              }}
            />
          )}
        </Box>

        {/* ADDONS */}
        {chosenAddons.map((addon, index) => (
          <Box
            key={index}
            sx={{
              mx: 2,
              width: 125,
              height: 125,
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
                  width: 125,
                  height: 125,
                  objectFit: "contain",
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      <Button
        variant="outlined"
        sx={{ my: 5, mx: 2 }}
        onClick={() => {
          setChosenItem(null);
          setChosenAddons([null, null]);
        }}
      >
        Reset Item and Addons
      </Button>
      <Button
        variant="outlined"
        sx={{ my: 5, mx: 2 }}
        onClick={() => {
          setData((prevData) => {
            return {
              ...prevData,
              item: { item: chosenItem, addons: chosenAddons },
            };
          });
          setStep((prevStep) => prevStep + 1);
        }}
      >
        Confirm Item and Addons
      </Button>

      <Divider />

      {/* ITEMS */}
      {(itemChoosing || chosenSlot >= 0) && (
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
            {itemChoosing
              ? items
                  .filter(
                    (item) =>
                      item.name.toLowerCase().includes(search) ||
                      item.category.name.toLowerCase().includes(search)
                  )
                  .map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        m: 5,
                        width: 150,
                        height: 150,
                        border: "1px solid white",
                        "&:hover": {
                          borderColor: "primary.dark",
                        },
                      }}
                      onClick={() => {
                        handleItemChoice(item);
                      }}
                    >
                      <Box
                        component="img"
                        src={item.image}
                        alt={`${item.id} Image`}
                        sx={{
                          width: 150,
                          height: 150,
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  ))
              : addons
                  .filter(
                    (addon) =>
                      addon.category.id === chosenItem.category.id &&
                      addon.name.toLowerCase().includes(search)
                  )
                  .map((addon) => (
                    <Box
                      key={addon.id}
                      sx={{
                        m: 5,
                        width: 150,
                        height: 150,
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
                          width: 150,
                          height: 150,
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

export default SurvivorItem;
