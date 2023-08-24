import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import CharacterRow from "../Matches/CharacterRow";
import ChoiceButtons from "./ChoiceButtons";

const AddCharacterSummary = ({
  character,
  setCharacter,
  characterType,
  handleReset,
  handleAdd,
}) => {
  return (
    <Box>
      <Typography variant="h4" my={4}>
        Summary
      </Typography>

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

      <ChoiceButtons
        resetText="Reset"
        handleReset={handleReset}
        confirmText="Confirm"
        handleConfirm={handleAdd}
      />
    </Box>
  );
};

export default AddCharacterSummary;
