import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StatsCharts from "../components/Matches/StatsCharts";
import SideChoice from "../components/SideChoice";
import ViewButtons from "../components/Matches/ViewButtons";
import MatchesPreviews from "../components/Matches/MatchesPreviews";
import { fetchMatches } from "../utils/getMatchUtils";

const Matches = () => {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [side, setSide] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [characterChoice, setCharacterChoice] = useState("all");
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const getMatches = async () => {
      const data = await fetchMatches();
      setMatches(data);
      setLoading(false);
    };

    getMatches();
  }, []);

  console.log(matches);

  return (
    <Box textAlign="center" mt={5}>
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
        <>
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
            <MatchesPreviews
              matches={matches}
              side={side}
              characterChoice={characterChoice}
              setCharacterChoice={setCharacterChoice}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Matches;
