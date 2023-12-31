import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const KillerChartSelect = ({ chartType, setChartType }) => {
  return (
    <FormControl sx={{ width: 300, my: 4 }}>
      <InputLabel>Chart Choice</InputLabel>
      <Select
        value={chartType}
        label="chart"
        onChange={(e) => setChartType(e.target.value)}
      >
        <MenuItem value="general">Match results count</MenuItem>
        <MenuItem value="average">Average kill rate by killer</MenuItem>
        <MenuItem value="averagePerk">Average kill rate by perk</MenuItem>
        <MenuItem value="survivorsCount">Survivors count</MenuItem>
        <MenuItem value="survivorPerks">Survivor perks count</MenuItem>
        <MenuItem value="mapsCount">Maps count</MenuItem>
        <MenuItem value="mapsRate">Average kill rate by map</MenuItem>
      </Select>
    </FormControl>
  );
};

export default KillerChartSelect;
