import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";
import { Box, Button, Divider } from "@mui/material";
import { paginate } from "../../utils/paginate";
import {
  handleSlotChoice,
  handleSingleItemChoice,
  handleMultiItemChoice,
} from "../../utils/addMatchUtils";
import CustomPagination from "../CustomPagination";
import ImageSlot from "../ImageSlot";
import SearchBar from "./SearchBar";

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
      const { data } = await supabase
        .from("items")
        .select(
          `id,
              name,
              image, 
              rarity: rarity_id ( id, created_at, name ), 
              category: category_id (id, name)
              `
        )
        .order("rarity(created_at)", { ascending: false });
      setItems(data);
    };

    const getAddons = async () => {
      const { data } = await supabase
        .from("item_addons")
        .select(
          `id,
              name,
              image, 
              rarity: rarity_id ( id, created_at, name ), 
              category: category_id (id, name)
              `
        )
        .order("rarity(created_at)", { ascending: false });
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
        <ImageSlot
          data={chosenItem}
          containerSx={{
            mx: 2,
            width: 200,
            height: 200,
            border: "1px solid",
            borderColor: itemChoosing ? "primary.main" : "white",
            "&:hover": {
              borderColor: "primary.dark",
            },
          }}
          imageSx={{
            width: 200,
            height: 200,
            objectFit: "contain",
          }}
          handleClick={() => {
            setPage(0);
            setSearch("");
            setChosenSlot(-1);
            setItemChoosing((prevChoosing) => !prevChoosing);
          }}
        />

        {/* ADDONS */}
        {chosenAddons.map((addon, index) => (
          <ImageSlot
            key={index}
            data={addon}
            containerSx={{
              mx: 2,
              width: 125,
              height: 125,
              border: "1px solid",
              borderColor: chosenSlot === index ? "primary.main" : "white",
              "&:hover": {
                borderColor: "primary.dark",
              },
            }}
            imageSx={{
              width: 125,
              height: 125,
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
              setItemChoosing(false);
            }}
          />
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
          <SearchBar search={search} setSearch={setSearch} setPage={setPage} />

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
                <ImageSlot
                  key={item.id}
                  data={item}
                  containerSx={{
                    m: 5,
                    width: 150,
                    height: 150,
                    border: "1px solid white",
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
                    handleSingleItemChoice(
                      item,
                      chosenItem,
                      setChosenItem,
                      setItemChoosing
                    );
                    setChosenAddons([null, null]);
                  }}
                />
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
                <ImageSlot
                  key={addon.id}
                  data={addon}
                  containerSx={{
                    m: 5,
                    width: 150,
                    height: 150,
                    border: "1px solid white",
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
