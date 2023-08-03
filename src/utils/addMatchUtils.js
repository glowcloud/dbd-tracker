import { supabase } from "../data/supabaseClient";

// ------------- ITEM SELECT HANDLERS -------------
const handleSlotChoice = (
  index,
  chosenSlot,
  setChosenSlot,
  setSearch,
  setPage
) => {
  setSearch("");
  setPage(0);
  if (chosenSlot !== index) {
    setChosenSlot(index);
  } else {
    setChosenSlot(-1);
  }
};

const handleSingleItemChoice = (
  item,
  chosenItem,
  setChosenItem,
  setChoosing
) => {
  if (chosenItem?.id === item.id) {
    setChosenItem(null);
  } else {
    setChosenItem(item);
  }

  setChoosing(false);
};

const handleMultiItemChoice = (
  item,
  chosenSlot,
  setChosenSlot,
  chosenItems,
  setChosenItems
) => {
  if (chosenItems.includes(item)) {
    if (chosenItems[chosenSlot] && chosenItems[chosenSlot].id === item.id) {
      setChosenItems((prevChosen) => {
        const temp = [...prevChosen];
        temp[chosenSlot] = null;
        return temp;
      });
    } else {
      const indexOfItem = chosenItems.indexOf(item);
      setChosenItems((prevChosen) => {
        const temp = [...prevChosen];
        temp[indexOfItem] = temp[chosenSlot];
        temp[chosenSlot] = item;
        return temp;
      });
    }
  } else {
    setChosenItems((prevChosen) => {
      const temp = [...prevChosen];
      temp[chosenSlot] = item;
      return temp;
    });
  }

  setChosenSlot(-1);
};

// ------------- SUPABASE ADD HANDLERS -------------
const handleAddSurvivor = async (survivor, isPlayer, userId) => {
  if (survivor) {
    const { data, error } = await supabase
      .from("match_survivors")
      .insert({
        survivor_id: survivor.character.id,
        item_id: survivor.item?.item?.id ? survivor.item.item.id : null,
        addon_1_id: survivor.item?.addons[0]?.id
          ? survivor.item.addons[0].id
          : null,
        addon_2_id: survivor.item?.addons[1]?.id
          ? survivor.item.addons[1].id
          : null,
        offering_id: survivor.offering?.id ? survivor.offering.id : null,
        perk_1_id: survivor.perks[0]?.id ? survivor.perks[0].id : null,
        perk_2_id: survivor.perks[1]?.id ? survivor.perks[1].id : null,
        perk_3_id: survivor.perks[2]?.id ? survivor.perks[2].id : null,
        perk_4_id: survivor.perks[3]?.id ? survivor.perks[3].id : null,
        player: isPlayer,
        escaped:
          survivor.status === ""
            ? null
            : survivor.status === "escaped"
            ? true
            : false,
        user_id: userId,
      })
      .select("id");
    if (!error) {
      return data[0].id;
    }
  }
  return null;
};

const handleAddKiller = async (killer, isPlayer, userId) => {
  if (killer) {
    const { data, error } = await supabase
      .from("match_killers")
      .insert({
        killer_id: killer.character.id,
        addon_1_id: killer.addons[0]?.id ? killer.addons[0].id : null,
        addon_2_id: killer.item?.addons[1]?.id ? killer.addons[1].id : null,
        offering_id: killer.offering?.id ? killer.offering.id : null,
        perk_1_id: killer.perks[0]?.id ? killer.perks[0].id : null,
        perk_2_id: killer.perks[1]?.id ? killer.perks[1].id : null,
        perk_3_id: killer.perks[2]?.id ? killer.perks[2].id : null,
        perk_4_id: killer.perks[3]?.id ? killer.perks[3].id : null,
        player: isPlayer,
        user_id: userId,
      })
      .select("id");
    if (!error) {
      return data[0].id;
    }
  }
  return null;
};

const handleAddMatch = async (data, session) => {
  const matchData = {
    side: data.side,
    character: data.character,
    perks: data.perks,
    offering: data.offering,
    realmMap: data.realmMap,
    result: data.result,
    survivors: data.survivors,
    ...data.sideData,
  };

  // ADD KILLER
  let killerId = null;
  if (matchData.side === "survivor") {
    killerId = await handleAddKiller(matchData.killer, false, session.user.id);
  } else {
    killerId = await handleAddKiller(
      {
        character: matchData.character,
        perks: matchData.perks,
        addons: matchData.addons,
        offering: matchData.offering,
      },
      true,
      session.user.id
    );
  }

  const survivorIds = [];

  // PLAYER SURVIVOR
  let survivorId = null;
  if (matchData.side === "survivor") {
    survivorId = await handleAddSurvivor(
      {
        character: matchData.character,
        perks: matchData.perks,
        item: matchData.item,
        offering: matchData.offering,
        status: matchData.status,
      },
      true,
      session.user.id
    );
    survivorIds.push(survivorId);
  }

  // OTHER SURVIVORS
  for (const survivor of matchData.survivors) {
    const id = await handleAddSurvivor(survivor, false, session.user.id);
    survivorIds.push(id);
  }

  // ADD SURVIVORS
  const { error } = await supabase.from("matches").insert({
    killer_id: killerId,
    survivor_1_id: survivorIds[0],
    survivor_2_id: survivorIds[1],
    survivor_3_id: survivorIds[2],
    survivor_4_id: survivorIds[3],
    side: matchData.side,
    map_id: matchData.realmMap?.id ? matchData.realmMap.id : null,
    result: matchData.result,
    user_id: session.user.id,
  });
  return error;
};

export {
  handleSlotChoice,
  handleSingleItemChoice,
  handleMultiItemChoice,
  handleAddMatch,
};
