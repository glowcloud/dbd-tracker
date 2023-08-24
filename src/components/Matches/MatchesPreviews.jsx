import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CharacterSelect from "./CharacterSelect";
import CharacterRow from "./CharacterRow";
import CustomPagination from "../CustomPagination";
import { paginate } from "../../utils/paginate";

const MatchesPreviews = ({
  matches,
  side,
  characterChoice,
  setCharacterChoice,
  currentPage,
  setCurrentPage,
}) => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* CHARACTER FILTER */}
      <CharacterSelect
        characterChoice={characterChoice}
        setCharacterChoice={setCharacterChoice}
        matches={matches}
        side={side}
        setCurrentPage={setCurrentPage}
      />

      {/* MATCHES */}
      {paginate(
        matches.filter(
          (match) =>
            match.side === side &&
            (characterChoice === "all" || match.character.id == characterChoice)
        ),
        5,
        currentPage
      ).map((match, index) => (
        <Box
          key={index}
          sx={{
            mx: { lg: 3, xl: 25 },
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
  );
};

export default MatchesPreviews;
