import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  getGeneralData,
  getAverageKillerData,
  getAveragePerkData,
  getAverageMapData,
} from "../../utils/killerCharts";
import {
  getGeneralData as getGeneralSurvivorData,
  getAverageSurvivorData,
  getAveragePerkData as getAverageSurvivorPerkData,
  getAverageKillerRate,
  getAverageKillerEscapes,
  getKillersCount,
  getKillerPerksCount,
  getAverageMapEscapes,
} from "../../utils/survivorCharts";
import {
  getSurvivorsCount,
  getSurvivorPerksCount,
  getMapsData,
} from "../../utils/sharedCharts";
import Chart from "./Chart";
import KillerChartSelect from "./KillerChartSelect";
import SurvivorChartSelect from "./SurvivorChartSelect";

const killerDataSwitch = (chartType, matches) => {
  switch (chartType) {
    case "average":
      return getAverageKillerData(matches);
    case "averagePerk":
      return getAveragePerkData(matches);
    case "survivorsCount":
      return getSurvivorsCount(matches);
    case "survivorPerks":
      return getSurvivorPerksCount(matches);
    case "mapsCount":
      return getMapsData(matches);
    case "mapsRate":
      return getAverageMapData(matches);
    default:
      return getGeneralData(matches);
  }
};

const survivorDataSwitch = (chartType, matches) => {
  switch (chartType) {
    case "average":
      return getAverageSurvivorData(matches);
    case "averagePerk":
      return getAverageSurvivorPerkData(matches);
    case "killersCount":
      return getKillersCount(matches);
    case "averageKillerRate":
      return getAverageKillerRate(matches);
    case "averageKillerEscapes":
      return getAverageKillerEscapes(matches);
    case "killerPerksCount":
      return getKillerPerksCount(matches);
    case "survivorPerksCount":
      return getSurvivorPerksCount(matches);
    case "survivorsCount":
      return getSurvivorsCount(matches);
    case "mapsCount":
      return getMapsData(matches);
    case "mapsEscapes":
      return getAverageMapEscapes(matches);
    default:
      return getGeneralSurvivorData(matches);
  }
};

const StatsCharts = ({ side, matches }) => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("general");

  useEffect(() => {
    if (side === "killer") {
      setData(killerDataSwitch(chartType, matches));
    }
    if (side === "survivor") {
      setData(survivorDataSwitch(chartType, matches));
    }
  }, [side, matches, chartType]);

  return (
    <Box>
      {side === "killer" && (
        <KillerChartSelect chartType={chartType} setChartType={setChartType} />
      )}
      {side === "survivor" && (
        <SurvivorChartSelect
          chartType={chartType}
          setChartType={setChartType}
        />
      )}
      <Chart data={data} chartType={chartType} />
    </Box>
  );
};

export default StatsCharts;
