import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paginate } from "../utils/paginate";
import CustomPagination from "../components/CustomPagination";
import CharacterRow from "../components/Matches/CharacterRow";
import StatsCharts from "../components/Matches/StatsCharts";
import { fetchMatches } from "../utils/getMatchUtils";
import SideChoice from "../components/SideChoice";
import ViewButtons from "../components/Matches/ViewButtons";
import CharacterSelect from "../components/Matches/CharacterSelect";

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
        <SideChoice
          handleKillerChoice={() => setSide("killer")}
          handleSurvivorChoice={() => setSide("survivor")}
        />
      )}

      {!loading && side && (
        <Box>
          {/* VIEW BUTTONS */}
          <ViewButtons
            showStats={showStats}
            setShowStats={setShowStats}
            side={side}
            setSide={setSide}
            setCurrentPage={setCurrentPage}
            setCharacterChoice={setCharacterChoice}
          />

          {/* CHARTS */}
          {showStats && (
            <StatsCharts
              side={side}
              matches={matches.filter((match) => match.side === side)}
            />
          )}

          {/* MATCHES PREVIEW */}
          {!showStats && matches?.length > 0 && (
            <Box>
              {/* CHARACTER FILTER */}
              <CharacterSelect
                characterChoice={characterChoice}
                setCharacterChoice={setCharacterChoice}
                matches={matches}
                side={side}
              />

              {/* MATCHES */}
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
