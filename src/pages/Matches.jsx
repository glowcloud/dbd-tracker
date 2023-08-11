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
import { paginate } from "../utils/paginate";
import CustomPagination from "../components/CustomPagination";
import CharacterRow from "../components/Matches/CharacterRow";
import StatsCharts from "../components/Matches/StatsCharts";
import survivorIcon from "../assets/other/survivorIcon.png";
import killerIcon from "../assets/other/killerIcon.png";
import { fetchMatches } from "../utils/getMatchUtils";

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
      const data = await fetchMatches();
      setMatches(data);
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
          {showStats && (
            <StatsCharts
              side={side}
              matches={matches.filter((match) => match.side === side)}
            />
          )}

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
