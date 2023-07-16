import { Box, Typography, Divider } from "@mui/material";
import { useEffect, useState } from "react";

import survivorIcon from "../assets/other/survivorIcon.png";
import killerIcon from "../assets/other/killerIcon.png";
import { useNavigate } from "react-router-dom";
import KillerCharts from "../components/Matches/KillerCharts";
import SurvivorCharts from "../components/Matches/SurvivorCharts";

const Matches = () => {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [side, setSide] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getMatches = async () => {
      const res = await fetch("http://localhost:3000/matches");
      const data = await res.json();
      setMatches(data);
      setLoading(false);
    };

    getMatches();
  }, []);

  return (
    <Box textAlign="center">
      {loading && <Typography>Loading...</Typography>}
      {!loading && !side && (
        <Box display="flex" alignItems="center" justifyContent="center" my={10}>
          <Box
            component="img"
            src={survivorIcon}
            alt="Survivor Icon"
            sx={{ width: 150, height: 150, mx: "1rem" }}
            onClick={() => {
              setSide("survivor");
            }}
          />
          <Divider orientation="vertical" flexItem />
          <Box
            component="img"
            src={killerIcon}
            alt="Killer Icon"
            sx={{ width: 150, height: 150, mx: "1rem" }}
            onClick={() => {
              setSide("killer");
            }}
          />
        </Box>
      )}
      {!loading && side && (
        <Box>
          {side === "killer" && (
            <KillerCharts
              matches={matches.filter((match) => match.side === side)}
            />
          )}
          {side === "survivor" && (
            <SurvivorCharts
              matches={matches.filter((match) => match.side === side)}
            />
          )}

          {matches
            .filter((match) => match.side === side)
            .map((match, index) => (
              <Box
                key={index}
                onClick={() => navigate(`/matches/${match.timestamp}`)}
              >
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Box
                    component="img"
                    src={match.character.image}
                    alt={`${match.character.id} Image`}
                    sx={{
                      width: 150,
                      height: 150,
                      objectFit: "contain",
                    }}
                  />
                  <Divider orientation="vertical" flexItem />
                  {match.perks.map((perk, perkIndex) => (
                    <Box
                      key={perkIndex}
                      sx={{
                        width: 75,
                        height: 75,
                        transform: "rotate(45deg)",
                        border: "1px solid white",
                        m: 5,
                      }}
                    >
                      {perk && (
                        <Box
                          component="img"
                          src={perk.image}
                          alt={`${perk.id} Image`}
                          sx={{
                            width: 75,
                            height: 75,
                            objectFit: "contain",
                            transform: "rotate(-45deg)",
                          }}
                        />
                      )}
                    </Box>
                  ))}
                  <Divider orientation="vertical" flexItem />
                  <Typography variant="h5" px={5}>
                    {side === "killer" ? match.result : match.status}
                  </Typography>
                </Box>
                <Divider />
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default Matches;
