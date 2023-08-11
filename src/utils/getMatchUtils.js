import { supabase } from "../data/supabaseClient";

const formatKillerMatch = (data) => {
  return {
    id: data.id,
    character: data.killer.character,
    perks: [
      data.killer.perk1,
      data.killer.perk2,
      data.killer.perk3,
      data.killer.perk4,
    ],
    addons: [data.killer.addon1, data.killer.addon2],
    offering: data.killer.offering,
    realmMap: data.realmMap,
    result: data.result,
    side: data.side,
    survivors: [
      data.survivor1
        ? {
            character: data.survivor1.character,
            perks: [
              data.survivor1.perk1,
              data.survivor1.perk2,
              data.survivor1.perk3,
              data.survivor1.perk4,
            ],
            item: data.survivor1.item,
            addons: [data.survivor1.addon1, data.survivor1.addon2],
            offering: data.survivor1.offering,
            escaped: data.survivor1.escaped,
          }
        : null,

      data.survivor2
        ? {
            character: data.survivor2.character,
            perks: [
              data.survivor2.perk1,
              data.survivor2.perk2,
              data.survivor2.perk3,
              data.survivor2.perk4,
            ],
            item: data.survivor2.item,
            addons: [data.survivor2.addon1, data.survivor2.addon2],
            offering: data.survivor2.offering,
            escaped: data.survivor2.escaped,
          }
        : null,
      data.survivor3
        ? {
            character: data.survivor3.character,
            perks: [
              data.survivor3.perk1,
              data.survivor3.perk2,
              data.survivor3.perk3,
              data.survivor3.perk4,
            ],
            item: data.survivor3.item,
            addons: [data.survivor3.addon1, data.survivor3.addon2],
            offering: data.survivor3.offering,
            escaped: data.survivor3.escaped,
          }
        : null,
      data.survivor4
        ? {
            character: data.survivor4.character,
            perks: [
              data.survivor4.perk1,
              data.survivor4.perk2,
              data.survivor4.perk3,
              data.survivor4.perk4,
            ],
            item: data.survivor4.item,
            addons: [data.survivor4.addon1, data.survivor4.addon2],
            offering: data.survivor4.offering,
            escaped: data.survivor4.escaped,
          }
        : null,
    ],
  };
};

const formatSurvivorMatch = (data) => {
  return {
    id: data.id,
    character: data.survivor1.character,
    perks: [
      data.survivor1.perk1,
      data.survivor1.perk2,
      data.survivor1.perk3,
      data.survivor1.perk4,
    ],
    item: data.survivor1.item,
    addons: [data.survivor1.addon1, data.survivor1.addon2],
    offering: data.survivor1.offering,
    escaped: data.survivor1.escaped,
    realmMap: data.realmMap,
    result: data.result,
    side: data.side,
    killer: data.killer
      ? {
          character: data.killer.character,
          perks: [
            data.killer.perk1,
            data.killer.perk2,
            data.killer.perk3,
            data.killer.perk4,
          ],
          addons: [data.killer.addon1, data.killer.addon2],
          offering: data.killer.offering,
        }
      : null,
    survivors: [
      data.survivor2
        ? {
            character: data.survivor2.character,
            perks: [
              data.survivor2.perk1,
              data.survivor2.perk2,
              data.survivor2.perk3,
              data.survivor2.perk4,
            ],
            item: data.survivor2.item,
            addons: [data.survivor2.addon1, data.survivor2.addon2],
            offering: data.survivor2.offering,
            escaped: data.survivor2.escaped,
          }
        : null,
      data.survivor3
        ? {
            character: data.survivor3.character,
            perks: [
              data.survivor3.perk1,
              data.survivor3.perk2,
              data.survivor3.perk3,
              data.survivor3.perk4,
            ],
            item: data.survivor3.item,
            addons: [data.survivor3.addon1, data.survivor3.addon2],
            offering: data.survivor3.offering,
            escaped: data.survivor3.escaped,
          }
        : null,
      data.survivor4
        ? {
            character: data.survivor4.character,
            perks: [
              data.survivor4.perk1,
              data.survivor4.perk2,
              data.survivor4.perk3,
              data.survivor4.perk4,
            ],
            item: data.survivor4.item,
            addons: [data.survivor4.addon1, data.survivor4.addon2],
            offering: data.survivor4.offering,
            escaped: data.survivor4.escaped,
          }
        : null,
    ],
  };
};

const fetchMatch = async (id) => {
  const { data } = await supabase
    .from("matches")
    .select(
      `     id,
              realmMap: map_id (id, name, image, realm: realm_id (name)),
              result,
              created_at, 
              killer: killer_id ( 
                  character: killer_id (id, name, image), 
                  addon1: addon_1_id (id, name, image), 
                  addon2: addon_2_id (id, name, image), 
                  offering: offering_id (id, name, image), 
                  perk1: perk_1_id (id, name, image), 
                  perk2: perk_2_id (id, name, image), 
                  perk3: perk_3_id (id, name, image), 
                  perk4: perk_4_id (id, name, image), 
                  player
              ), 
              survivor1: survivor_1_id ( 
                  character: survivor_id (id, name, image), 
                  item: item_id (id, name, image), 
                  addon1: addon_1_id (id, name, image), 
                  addon2: addon_2_id (id, name, image), 
                  offering: offering_id (id, name, image), 
                  perk1: perk_1_id (id, name, image), 
                  perk2: perk_2_id (id, name, image), 
                  perk3: perk_3_id (id, name, image), 
                  perk4: perk_4_id (id, name, image), 
                  player, 
                  escaped
              ), 
              survivor2: survivor_2_id ( 
                  character: survivor_id (id, name, image), 
                  item: item_id (id, name, image), 
                  addon1: addon_1_id (id, name, image), 
                  addon2: addon_2_id (id, name, image), 
                  offering: offering_id (id, name, image), 
                  perk1: perk_1_id (id, name, image), 
                  perk2: perk_2_id (id, name, image), 
                  perk3: perk_3_id (id, name, image), 
                  perk4: perk_4_id (id, name, image), 
                  player, 
                  escaped
              ), 
              survivor3: survivor_3_id ( 
                  character: survivor_id (id, name, image), 
                  item: item_id (id, name, image), 
                  addon1: addon_1_id (id, name, image), 
                  addon2: addon_2_id (id, name, image), 
                  offering: offering_id (id, name, image), 
                  perk1: perk_1_id (id, name, image), 
                  perk2: perk_2_id (id, name, image), 
                  perk3: perk_3_id (id, name, image), 
                  perk4: perk_4_id (id, name, image), 
                  player, 
                  escaped
              ), 
              survivor4: survivor_4_id ( 
                  character: survivor_id (id, name, image), 
                  item: item_id (id, name, image), 
                  addon1: addon_1_id (id, name, image), 
                  addon2: addon_2_id (id, name, image), 
                  offering: offering_id (id, name, image), 
                  perk1: perk_1_id (id, name, image), 
                  perk2: perk_2_id (id, name, image), 
                  perk3: perk_3_id (id, name, image), 
                  perk4: perk_4_id (id, name, image), 
                  player, 
                  escaped
              ), 
              side
              `
    )
    .eq("id", id)
    .maybeSingle();

  if (data?.side === "killer") {
    return formatKillerMatch(data);
  }

  if (data?.side === "survivor") {
    return formatSurvivorMatch(data);
  }

  return null;
};

const fetchMatches = async () => {
  const { data } = await supabase
    .from("matches")
    .select(
      `     id,
              realmMap: map_id (id, name, image, realm: realm_id (name)),
              result,
              created_at, 
              killer: killer_id ( 
                  character: killer_id (id, name, image), 
                  addon1: addon_1_id (id, name, image), 
                  addon2: addon_2_id (id, name, image), 
                  offering: offering_id (id, name, image), 
                  perk1: perk_1_id (id, name, image), 
                  perk2: perk_2_id (id, name, image), 
                  perk3: perk_3_id (id, name, image), 
                  perk4: perk_4_id (id, name, image), 
                  player
              ), 
              survivor1: survivor_1_id ( 
                  character: survivor_id (id, name, image), 
                  item: item_id (id, name, image), 
                  addon1: addon_1_id (id, name, image), 
                  addon2: addon_2_id (id, name, image), 
                  offering: offering_id (id, name, image), 
                  perk1: perk_1_id (id, name, image), 
                  perk2: perk_2_id (id, name, image), 
                  perk3: perk_3_id (id, name, image), 
                  perk4: perk_4_id (id, name, image), 
                  player, 
                  escaped
              ), 
              survivor2: survivor_2_id ( 
                  character: survivor_id (id, name, image), 
                  item: item_id (id, name, image), 
                  addon1: addon_1_id (id, name, image), 
                  addon2: addon_2_id (id, name, image), 
                  offering: offering_id (id, name, image), 
                  perk1: perk_1_id (id, name, image), 
                  perk2: perk_2_id (id, name, image), 
                  perk3: perk_3_id (id, name, image), 
                  perk4: perk_4_id (id, name, image), 
                  player, 
                  escaped
              ), 
              survivor3: survivor_3_id ( 
                  character: survivor_id (id, name, image), 
                  item: item_id (id, name, image), 
                  addon1: addon_1_id (id, name, image), 
                  addon2: addon_2_id (id, name, image), 
                  offering: offering_id (id, name, image), 
                  perk1: perk_1_id (id, name, image), 
                  perk2: perk_2_id (id, name, image), 
                  perk3: perk_3_id (id, name, image), 
                  perk4: perk_4_id (id, name, image), 
                  player, 
                  escaped
              ), 
              survivor4: survivor_4_id ( 
                  character: survivor_id (id, name, image), 
                  item: item_id (id, name, image), 
                  addon1: addon_1_id (id, name, image), 
                  addon2: addon_2_id (id, name, image), 
                  offering: offering_id (id, name, image), 
                  perk1: perk_1_id (id, name, image), 
                  perk2: perk_2_id (id, name, image), 
                  perk3: perk_3_id (id, name, image), 
                  perk4: perk_4_id (id, name, image), 
                  player, 
                  escaped
              ), 
              side
              `
    )
    .order("created_at", { ascending: false });

  const matches = [];

  data.forEach((match) => {
    if (match.side === "killer") {
      const newMatch = formatKillerMatch(match);
      matches.push(newMatch);
    }
    if (match.side === "survivor") {
      const newMatch = formatSurvivorMatch(match);
      matches.push(newMatch);
    }
  });

  return matches;
};

export { fetchMatch, fetchMatches };
