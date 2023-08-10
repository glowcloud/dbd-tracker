import {
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import survivorIcon from "../assets/other/survivorIcon.png";
import killerIcon from "../assets/other/killerIcon.png";
import KillerCharts from "../components/Matches/KillerCharts";
import SurvivorCharts from "../components/Matches/SurvivorCharts";
import { supabase } from "../data/supabaseClient";
import { paginate } from "../utils/paginate";
import CustomPagination from "../components/CustomPagination";
import CharacterRow from "../components/Matches/CharacterRow";

const Matches = () => {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [side, setSide] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [characterChoice, setCharacterChoice] = useState("all");
  const [showStats, setShowStats] = useState(false);
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
        .order("created_at", { ascending: false });

      const properMatches = [];
      data.forEach((match) => {
        if (match.side === "killer") {
          const newMatch = {
            id: match.id,
            character: match.killer.character,
            perks: [
              match.killer.perk1,
              match.killer.perk2,
              match.killer.perk3,
              match.killer.perk4,
            ],
            addons: [match.killer.addon1, match.killer.addon2],
            offering: match.killer.offering,
            realmMap: match.realmMap,
            result: match.result,
            side: match.side,
            survivors: [
              match.survivor1
                ? {
                    character: match.survivor1.character,
                    perks: [
                      match.survivor1.perk1,
                      match.survivor1.perk2,
                      match.survivor1.perk3,
                      match.survivor1.perk4,
                    ],
                    item: match.item,
                    addons: [match.survivor1.addon1, match.survivor1.addon2],
                    escaped: match.survivor1.escaped,
                  }
                : null,

              match.survivor2
                ? {
                    character: match.survivor2.character,
                    perks: [
                      match.survivor2.perk1,
                      match.survivor2.perk2,
                      match.survivor2.perk3,
                      match.survivor2.perk4,
                    ],
                    item: match.item,
                    addons: [match.survivor2.addon1, match.survivor2.addon2],
                    escaped: match.survivor2.escaped,
                  }
                : null,
              match.survivor3
                ? {
                    character: match.survivor3.character,
                    perks: [
                      match.survivor3.perk1,
                      match.survivor3.perk2,
                      match.survivor3.perk3,
                      match.survivor3.perk4,
                    ],
                    item: match.item,
                    addons: [match.survivor3.addon1, match.survivor3.addon2],
                    escaped: match.survivor3.escaped,
                  }
                : null,
              match.survivor4
                ? {
                    character: match.survivor4.character,
                    perks: [
                      match.survivor4.perk1,
                      match.survivor4.perk2,
                      match.survivor4.perk3,
                      match.survivor4.perk4,
                    ],
                    item: match.item,
                    addons: [match.survivor4.addon1, match.survivor4.addon2],
                    escaped: match.survivor4.escaped,
                  }
                : null,
            ],
          };
          properMatches.push(newMatch);
        }
        if (match.side === "survivor") {
          const newMatch = {
            id: match.id,
            character: match.survivor1.character,
            perks: [
              match.survivor1.perk1,
              match.survivor1.perk2,
              match.survivor1.perk3,
              match.survivor1.perk4,
            ],
            item: match.survivor1.item,
            addons: [match.survivor1.addon1, match.survivor1.addon2],
            offering: match.survivor1.offering,
            escaped: match.survivor1.escaped,
            realmMap: match.realmMap,
            result: match.result,
            side: match.side,
            killer: match.killer
              ? {
                  character: match.killer.character,
                  perks: [
                    match.killer.perk1,
                    match.killer.perk2,
                    match.killer.perk3,
                    match.killer.perk4,
                  ],
                  addons: [match.killer.addon1, match.killer.addon2],
                  offering: match.killer.offering,
                }
              : null,
            survivors: [
              match.survivor2
                ? {
                    character: match.survivor2.character,
                    perks: [
                      match.survivor2.perk1,
                      match.survivor2.perk2,
                      match.survivor2.perk3,
                      match.survivor2.perk4,
                    ],
                    item: match.survivor2.item,
                    addons: [match.survivor2.addon1, match.survivor2.addon2],
                    offering: match.survivor2.offering,
                    escaped: match.survivor2.escaped,
                  }
                : null,

              match.survivor3
                ? {
                    character: match.survivor3.character,
                    perks: [
                      match.survivor3.perk1,
                      match.survivor3.perk2,
                      match.survivor3.perk3,
                      match.survivor3.perk4,
                    ],
                    item: match.survivor3.item,
                    addons: [match.survivor3.addon1, match.survivor3.addon2],
                    offering: match.survivor3.offering,
                    escaped: match.survivor3.escaped,
                  }
                : null,

              match.survivor4
                ? {
                    character: match.survivor4.character,
                    perks: [
                      match.survivor4.perk1,
                      match.survivor4.perk2,
                      match.survivor4.perk3,
                      match.survivor4.perk4,
                    ],
                    item: match.survivor4.item,
                    addons: [match.survivor4.addon1, match.survivor4.addon2],
                    offering: match.survivor4.offering,
                    escaped: match.survivor4.escaped,
                  }
                : null,
            ],
          };
          properMatches.push(newMatch);
        }
      });

      setMatches(properMatches);
      setLoading(false);
    };

    getMatches();
  }, []);

  return (
    <Box textAlign="center">
      {/* LOADING */}
      {loading && <Typography>Loading...</Typography>}

      {/* SIDE CHOICE */}
      {!loading && !side && (
        <>
          <Typography variant="h4" mt={10} mb={5}>
            Choose your side:
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box
              component="img"
              src={survivorIcon}
              alt="Survivor Icon"
              sx={{
                width: 150,
                height: 150,
                mx: "1rem",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                setSide("survivor");
              }}
            />
            <Divider orientation="vertical" flexItem />
            <Box
              component="img"
              src={killerIcon}
              alt="Killer Icon"
              sx={{
                width: 150,
                height: 150,
                mx: "1rem",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                setSide("killer");
              }}
            />
          </Box>
        </>
      )}

      {!loading && side && (
        <Box>
          <Button
            variant="outlined"
            sx={{
              my: 2,
              mx: 1,
            }}
            onClick={() => {
              setShowStats((prevShow) => !prevShow);
            }}
          >
            {showStats ? "Show matches" : "Show statistics"}
          </Button>

          <Button
            variant="outlined"
            sx={{
              my: 2,
              mx: 1,
            }}
            onClick={() => {
              setSide((prevSide) =>
                prevSide === "killer" ? "survivor" : "killer"
              );
              setShowStats(false);
              setCurrentPage(0);
              setCharacterChoice("all");
            }}
          >
            {side === "killer" ? "Survivor matches" : "Killer matches"}
          </Button>

          {/* CHARTS */}
          {showStats && side === "killer" && (
            <KillerCharts
              matches={matches.filter((match) => match.side === side)}
              chartType="averagePerk"
            />
          )}
          {showStats && side === "survivor" && (
            <SurvivorCharts
              matches={matches.filter((match) => match.side === side)}
            />
          )}
          {showStats && <Divider />}

          {/* MATCH PREVIEWS */}
          {!showStats && matches?.length > 0 && (
            <Box>
              {/* CHOOSE CHARACTER */}

              <FormControl sx={{ width: 300, my: 2 }}>
                <InputLabel>Character</InputLabel>
                <Select
                  value={characterChoice}
                  label="chart"
                  onChange={(e) => setCharacterChoice(e.target.value)}
                  defaultValue="all"
                >
                  <MenuItem value="all">All</MenuItem>
                  {[
                    ...new Map(
                      matches
                        .filter((match) => match.side === side)
                        .map((match) => [match.character.id, match])
                    ).values(),
                  ].map((match) => (
                    <MenuItem
                      key={match.character.id}
                      value={match.character.id}
                    >
                      {match.character.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {paginate(
                matches.filter(
                  (match) =>
                    match.side === side &&
                    (characterChoice === "all" ||
                      match.character.id == characterChoice)
                ),
                5,
                currentPage
              ).map((match, index) => (
                <Box
                  key={index}
                  sx={{
                    mx: 5,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => navigate(`/matches/${match.id}`)}
                >
                  <CharacterRow data={match} player={false} side={match.side} />
                </Box>
              ))}

              {/* PAGINATION */}
              {side && matches.length > 0 && (
                <CustomPagination
                  itemsCount={
                    matches.filter(
                      (match) =>
                        match.side === side &&
                        (characterChoice === "all" ||
                          match.character.id == characterChoice)
                    ).length
                  }
                  itemsPerPage={5}
                  page={currentPage}
                  setPage={setCurrentPage}
                />
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Matches;
