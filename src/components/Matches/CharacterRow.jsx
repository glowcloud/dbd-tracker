import { Box, Typography, Divider } from "@mui/material";
import CharacterRowSlot from "./CharacterRowSlot";
import CharacterRowPerk from "./CharacterRowPerk";
import CharacterRowStatus from "./CharacterRowStatus";

const CharacterRow = ({ data, player, side, noResult }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="1px solid"
      borderColor={player ? "primary.dark" : "grey"}
      my={2}
    >
      {/* CHARACTER */}
      <CharacterRowSlot data={data?.character} slotLength={150} />

      <Divider orientation="vertical" flexItem />

      {/* SURVIVOR ITEM */}
      {side === "survivor" && (
        <CharacterRowSlot data={data?.item} slotLength={75} />
      )}

      {/* ADDONS */}
      {data?.addons
        ? data.addons.map((addon, addonIndex) => (
            <CharacterRowSlot key={addonIndex} data={addon} slotLength={50} />
          ))
        : [null, null].map((addon, addonIndex) => (
            <CharacterRowSlot key={addonIndex} data={addon} slotLength={50} />
          ))}
      <Divider orientation="vertical" flexItem />

      {/* OFFERING */}
      <CharacterRowSlot data={data?.offering} slotLength={75} />
      <Divider orientation="vertical" flexItem />

      {/* PERKS */}
      {data?.perks
        ? data.perks.map((perk, perkIndex) => (
            <CharacterRowPerk key={perkIndex} perk={perk} />
          ))
        : [null, null, null, null].map((perk, perkIndex) => (
            <CharacterRowPerk key={perkIndex} perk={perk} />
          ))}
      {!noResult && <Divider orientation="vertical" flexItem />}

      {/* RESULT */}
      {!noResult && side === "killer" && (
        <Typography variant="h5" px={5}>
          {data?.result ? data.result : ""}
        </Typography>
      )}
      {!noResult && side === "survivor" && (
        <CharacterRowStatus data={data?.escaped} />
      )}
    </Box>
  );
};

export default CharacterRow;
