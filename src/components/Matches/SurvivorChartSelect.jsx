import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SurvivorChartSelect = ({ chartType, setChartType }) => {
  return (
    <FormControl sx={{ width: 300, my: 4 }}>
      <InputLabel>Chart Choice</InputLabel>
      <Select
        value={chartType}
        label="chart"
        onChange={(e) => setChartType(e.target.value)}
      >
        <MenuItem value="general">Escaped and killed count</MenuItem>
        <MenuItem value="average">Average escape rate by survivor</MenuItem>
        <MenuItem value="averagePerk">Average escape rate by perk</MenuItem>
        <MenuItem value="killersCount">Killers count</MenuItem>
        <MenuItem value="averageKillerRate">Average kills by killer</MenuItem>
        <MenuItem value="averageKillerEscapes">
          Your average escape rate by killer
        </MenuItem>
        <MenuItem value="killerPerksCount">Killer perks count</MenuItem>
        <MenuItem value="survivorPerksCount">Survivor perks count</MenuItem>
        <MenuItem value="survivorsCount">Survivor count</MenuItem>
        <MenuItem value="mapsCount">Maps count</MenuItem>
        <MenuItem value="mapsEscapes">Your average escape rate by map</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SurvivorChartSelect;
