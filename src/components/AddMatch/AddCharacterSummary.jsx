import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CharacterRow from "../Matches/CharacterRow";

const AddCharacterSummary = ({
  character,
  setCharacter,
  characterType,
  handleReset,
  handleAdd,
}) => {
  return (
    <Box>
      <CharacterRow
        data={{
          ...character,
          item: character?.sideData.item?.item
            ? character.sideData.item.item
            : null,
          addons:
            characterType === "survivor"
              ? character?.sideData.item?.addons
                ? character.sideData.item.addons
                : null
              : character?.sideData?.addons
              ? character.sideData.addons
              : null,
        }}
        player={false}
        side={characterType}
        noResult
      />

      {/* STATUS - SURVIVORS */}
      {characterType === "survivor" && (
        <Box my={10} px={40}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={character.status}
              label="Status"
              onChange={(e) =>
                setCharacter((prevCharacter) => {
                  return { ...prevCharacter, status: e.target.value };
                })
              }
            >
              <MenuItem value="escaped">Escaped</MenuItem>
              <MenuItem value="killed">Killed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      <Box textAlign="center">
        <Button
          onClick={() => {
            handleReset();
          }}
        >
          Reset
        </Button>
        <Button onClick={handleAdd}>Confirm</Button>
      </Box>
    </Box>
  );
};

export default AddCharacterSummary;
