import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CharacterSelect = ({
  characterChoice,
  setCharacterChoice,
  matches,
  side,
}) => {
  return (
    <FormControl sx={{ width: 300, mt: 4, mb: 2 }}>
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
          <MenuItem key={match.character.id} value={match.character.id}>
            {match.character.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CharacterSelect;
