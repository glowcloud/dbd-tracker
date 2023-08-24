import { Box, Typography } from "@mui/material";
import CharacterRow from "../Matches/CharacterRow";
import ImageSlot from "../ImageSlot";

const Summary = ({ data }) => {
  return (
    <>
      <Typography variant="h4" mt={4} mb={6}>
        Summary
      </Typography>

      <Box mx={{ lg: 5, xl: 25 }}>
        {/* PLAYER */}
        <CharacterRow
          data={{
            ...data,
            item: data?.item?.item ? data.item.item : null,
            addons:
              data.side === "survivor"
                ? data?.item?.addons
                  ? data.item.addons
                  : null
                : data.addons
                ? data.addons
                : null,
            escaped:
              data.status === null || data.status === ""
                ? null
                : data.status === "escaped"
                ? true
                : false,
          }}
          player={true}
          side={data.side}
        />

        {/* SURVIVORS */}
        {data.survivors.map((survivor, survivorIndex) => (
          <CharacterRow
            key={survivorIndex}
            data={{
              ...survivor,
              item: survivor?.item?.item ? survivor.item.item : null,
              addons: survivor?.item?.addons ? survivor.item.addons : null,
              escaped:
                survivor === null || survivor.status === ""
                  ? null
                  : survivor.status === "escaped"
                  ? true
                  : false,
            }}
            player={false}
            side="survivor"
          />
        ))}

        {/* KILLER */}
        {data.side === "survivor" && (
          <CharacterRow
            data={{
              ...data.killer,
              result: data.result ? data.result : "",
            }}
            player={false}
            side="killer"
          />
        )}

        {/* MAP */}
        <Box display="flex" justifyContent="center" alignItems="center">
          <ImageSlot
            data={data.realmMap}
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
      </Box>
    </>
  );
};

export default Summary;
