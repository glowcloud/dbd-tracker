import { Box } from "@mui/material";
import CharacterRow from "../Matches/CharacterRow";
import ImageSlot from "../ImageSlot";

const MatchData = ({ match }) => {
  return (
    <>
      <Box mx={{ lg: 3, xl: 25 }}>
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
      </Box>

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
    </>
  );
};

export default MatchData;
