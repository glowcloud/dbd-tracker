import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";
import { Box, Button, TextField, Divider } from "@mui/material";
import { paginate } from "../../utils/paginate";
import {
  handleSlotChoice,
  handleSingleItemChoice,
  handleMultiItemChoice,
} from "../../utils/addMatchUtils";
import CustomPagination from "../CustomPagination";

const SurvivorItem = ({ setStep, setData, data }) => {
  const [chosenItem, setChosenItem] = useState(
    data?.sideData?.item?.item ? data.sideData.item.item : null
  );
  const [chosenAddons, setChosenAddons] = useState(
    data?.sideData?.item?.addons?.length > 0
      ? data.sideData.item.addons
      : [null, null]
  );
  const [itemChoosing, setItemChoosing] = useState(false);
  const [chosenSlot, setChosenSlot] = useState(-1);
  const [items, setItems] = useState([]);
  const [addons, setAddons] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

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
            setPage(0);
            setSearch("");
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
              handleSlotChoice(
                index,
                chosenSlot,
                setChosenSlot,
                setSearch,
                setPage
              );
              setItemChoosing(false);
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
              sideData: {
                ...prevData.sideData,
                item: { item: chosenItem, addons: chosenAddons },
              },
            };
          });
          setStep((prevStep) => prevStep + 1);
        }}
      >
        Confirm Item and Addons
      </Button>

      <Divider />

      {/* ITEMS AND ADDONS */}
      {(itemChoosing || (chosenItem && chosenSlot >= 0)) && (
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
            {itemChoosing &&
              paginate(
                items.filter(
                  (item) =>
                    item.name.toLowerCase().includes(search) ||
                    item.category.name.toLowerCase().includes(search)
                ),
                10,
                page
              ).map((item) => (
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
                    handleSingleItemChoice(
                      item,
                      chosenItem,
                      setChosenItem,
                      setItemChoosing
                    );
                    setChosenAddons([null, null]);
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
              ))}

            {chosenItem &&
              chosenSlot >= 0 &&
              paginate(
                addons.filter(
                  (addon) =>
                    addon.category.id === chosenItem.category.id &&
                    addon.name.toLowerCase().includes(search)
                ),
                10,
                page
              ).map((addon) => (
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
                    handleMultiItemChoice(
                      addon,
                      chosenSlot,
                      setChosenSlot,
                      chosenAddons,
                      setChosenAddons
                    );
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

          <CustomPagination
            itemsCount={
              itemChoosing
                ? items.filter(
                    (item) =>
                      item.name.toLowerCase().includes(search) ||
                      item.category.name.toLowerCase().includes(search)
                  ).length
                : addons.filter(
                    (addon) =>
                      addon.category.id === chosenItem.category.id &&
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

export default SurvivorItem;
