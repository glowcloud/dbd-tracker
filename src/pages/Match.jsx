import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CharacterRow from "../components/Matches/CharacterRow";
import ImageSlot from "../components/ImageSlot";
import { fetchMatch } from "../utils/getMatchUtils";

const Match = () => {
  const [loading, setLoading] = useState(true);
  const [match, setMatch] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getMatch = async () => {
      const data = await fetchMatch(id);
      setMatch(data);
      setLoading(false);
    };

    getMatch();
  }, [id]);

  return (
    <>
      {/* LOADING */}
      {loading && <Typography>Loading...</Typography>}

      {/* MATCH NOT FOUND */}
      {!loading && !match && <Typography>Match not found</Typography>}

      {/* DATA */}
      {!loading && match && (
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
