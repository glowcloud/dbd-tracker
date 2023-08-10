import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { supabase } from "../data/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import CharacterRow from "../components/Matches/CharacterRow";
import ImageSlot from "../components/ImageSlot";

const Match = () => {
  const [loading, setLoading] = useState(true);
  const [match, setMatch] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getMatches = async () => {
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

      let newMatch = null;

      if (data?.side === "killer") {
        newMatch = {
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
      }

      if (data?.side === "survivor") {
        newMatch = {
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
      }

      setMatch(newMatch);
      setLoading(false);
    };

    getMatches();
  }, [id]);

  return (
    <>
      {!loading && (
        <Box textAlign="center">
          {/* PLAYER */}
          <CharacterRow data={match} player={true} side={match.side} />

          {/* SURVIVORS */}
          {match.survivors.map((survivor, survivorIndex) => (
            <CharacterRow
              key={survivorIndex}
              data={survivor}
              player={false}
              side="survivor"
            />
          ))}

          {/* KILLER */}
          {match.side === "survivor" && (
            <CharacterRow
              data={{
                ...match.killer,
                result: match.result ? match.result : "",
              }}
              player={false}
              side="killer"
            />
          )}

          {/* MAP */}
          <Box display="flex" justifyContent="center" alignItems="center">
            <ImageSlot
              data={match.realmMap}
              containerSx={{
                width: 250,
                height: 250,
                border: "1px solid white",
                m: 2,
              }}
              imageSx={{
                width: 250,
                height: 250,
                objectFit: "contain",
              }}
            />
          </Box>

          {/* BACK BUTTON */}
          <Button
            variant="outlined"
            sx={{
              my: 2,
              mx: 1,
            }}
            onClick={() => {
              navigate("/matches");
            }}
          >
            Back to matches
          </Button>
        </Box>
      )}
    </>
  );
};

export default Match;
