import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMatch } from "../utils/getMatchUtils";
import MatchData from "../components/Match/MatchData";

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
    <Box textAlign="center">
      {/* LOADING */}
      {loading && <Typography gutterBottom>Loading...</Typography>}

      {/* MATCH NOT FOUND */}
      {!loading && !match && (
        <Typography gutterBottom>Match not found</Typography>
      )}

      {/* DATA */}
      {!loading && match && <MatchData match={match} />}

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
  );
};

export default Match;
