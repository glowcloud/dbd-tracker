import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";
import { Box, Divider, Typography } from "@mui/material";
import { paginate } from "../../utils/paginate";
import {
  handleSingleItemChoice,
  handleMultiItemChoice,
} from "../../utils/addMatchUtils";
import ChoiceButtons from "./ChoiceButtons";
import SingleSlotChoice from "./SingleSlotChoice";
import MultiSlotChoice from "./MultiSlotChoice";
import ChoiceList from "./ChoiceList";

const SurvivorItem = ({ setStep, setData, data, addCharacter }) => {
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
      <Typography variant="h4" my={4}>
        {addCharacter
          ? "Choose the item and addons:"
          : "Choose your item and addons:"}
      </Typography>

      {/* ITEM SLOTS */}
      <SingleSlotChoice
        chosenItem={chosenItem}
        choosing={itemChoosing}
        handleClick={() => {
          setPage(0);
          setSearch("");
          setChosenSlot(-1);
          setItemChoosing((prevChoosing) => !prevChoosing);
        }}
        customConSx={{
          width: 200,
          height: 200,
        }}
        customImgSx={{
          width: 200,
          height: 200,
        }}
      />

      {/* ADDON SLOTS */}
      <MultiSlotChoice
        chosenItems={chosenAddons}
        chosenSlot={chosenSlot}
        setChosenSlot={setChosenSlot}
        setSearch={setSearch}
        setPage={setPage}
        customConSx={{ width: 125, height: 125 }}
        customImgSx={{ width: 125, height: 125 }}
        itemChoice
        setItemChoosing={setItemChoosing}
      />

      <ChoiceButtons
        resetText="Reset Item and Addons"
        handleReset={() => {
          setChosenItem(null);
          setChosenAddons([null, null]);
        }}
        confirmText="Confirm Item and Addons"
        handleConfirm={() => {
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
      />

      <Divider />

      {/* ITEMS  */}
      {itemChoosing && (
        <ChoiceList
          filteredChoices={paginate(
            items.filter(
              (item) =>
                item.name.toLowerCase().includes(search) ||
                item.category.name.toLowerCase().includes(search)
            ),
            10,
            page
          )}
          handleChoice={(choice) => {
            handleSingleItemChoice(
              choice,
              chosenItem,
              setChosenItem,
              setItemChoosing
            );
            setChosenAddons([null, null]);
          }}
          itemsCount={
            items.filter(
              (item) =>
                item.name.toLowerCase().includes(search) ||
                item.category.name.toLowerCase().includes(search)
            ).length
          }
          itemsPerPage={10}
          search={search}
          setSearch={setSearch}
          page={page}
          setPage={setPage}
          customConSx={{
            width: 150,
            height: 150,
          }}
          customImgSx={{
            width: 150,
            height: 150,
          }}
        />
      )}

      {/* ADDONS */}
      {chosenItem && chosenSlot >= 0 && (
        <ChoiceList
          filteredChoices={paginate(
            addons.filter(
              (addon) =>
                addon.category.id === chosenItem.category.id &&
                addon.name.toLowerCase().includes(search)
            ),
            10,
            page
          )}
          handleChoice={(choice) => {
            handleMultiItemChoice(
              choice,
              chosenSlot,
              setChosenSlot,
              chosenAddons,
              setChosenAddons
            );
          }}
          itemsCount={
            addons.filter(
              (addon) =>
                addon.category.id === chosenItem.category.id &&
                addon.name.toLowerCase().includes(search)
            ).length
          }
          itemsPerPage={10}
          search={search}
          setSearch={setSearch}
          page={page}
          setPage={setPage}
          customConSx={{
            width: 150,
            height: 150,
          }}
          customImgSx={{
            width: 150,
            height: 150,
          }}
        />
      )}
    </Box>
  );
};

export default SurvivorItem;
