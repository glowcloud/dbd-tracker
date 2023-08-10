import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// GENERAL KILL COUNT
const getGeneralData = (matches) => {
  const dataMap = new Map([
    ["4 kills", 0],
    ["3 kills", 0],
    ["2 kills", 0],
    ["1 kill", 0],
    ["0 kills", 0],
  ]);

  matches.forEach((match) => {
    if (match.result) {
      dataMap.set(match.result, dataMap.get(match.result) + 1);
    }
  });

  return [...dataMap].map((item) => {
    return { name: item[0], count: item[1] };
  });
};

// AVERAGE KILL RATE BY KILLER
const getAverageKillerData = (matches) => {
  const dataMap = new Map();

  matches.forEach((match) => {
    if (match.result) {
      let result = 0;
      switch (match.result) {
        case "1 kill":
          result = 1;
          break;
        case "2 kills":
          result = 2;
          break;
        case "3 kills":
          result = 3;
          break;
        case "4 kills":
          result = 4;
          break;
        default:
          break;
      }
      if (dataMap.has(match.character.name)) {
        dataMap.set(
          match.character.name,
          dataMap.get(match.character.name) + result
        );
      } else {
        dataMap.set(match.character.name, result);
      }
    }
  });

  return [...dataMap]
    .map((item) => {
      return {
        name: item[0],
        count:
          item[1] /
          matches.filter((match) => match.character.name === item[0]).length,
      };
    })
    .sort((a, b) => b.count - a.count);
};

// AVERAGE KILL RATE BY PERK
const getAveragePerkData = (matches) => {
  const dataMap = new Map();

  matches.forEach((match) => {
    if (match.result) {
      let result = 0;
      switch (match.result) {
        case "1 kill":
          result = 1;
          break;
        case "2 kills":
          result = 2;
          break;
        case "3 kills":
          result = 3;
          break;
        case "4 kills":
          result = 4;
          break;
        default:
          break;
      }
      match.perks.forEach((perk) => {
        if (perk) {
          if (dataMap.has(perk.name)) {
            dataMap.set(perk.name, dataMap.get(perk.name) + result);
          } else {
            dataMap.set(perk.name, result);
          }
        }
      });
    }
  });

  return [...dataMap]
    .map((item) => {
      return {
        name: item[0],
        count:
          item[1] /
          matches.filter((match) =>
            match.perks.some((perk) => perk !== null && perk.name === item[0])
          ).length,
      };
    })
    .sort((a, b) => b.count - a.count);
};

// SURVIVORS COUNT
const getSurvivorsCount = (matches) => {
  const dataMap = new Map();

  matches.forEach((match) => {
    match.survivors.forEach((survivor) => {
      if (survivor) {
        if (dataMap.has(survivor.character.name)) {
          dataMap.set(
            survivor.character.name,
            dataMap.get(survivor.character.name) + 1
          );
        } else {
          dataMap.set(survivor.character.name, 1);
        }
      }
    });
  });

  return [...dataMap]
    .map((item) => {
      return {
        name: item[0],
        count: item[1],
      };
    })
    .sort((a, b) => b.count - a.count);
};

// SURVIVOR PERKS COUNT
const getSurvivorPerksCount = (matches) => {
  const dataMap = new Map();

  matches.forEach((match) => {
    match.survivors.forEach((survivor) => {
      if (survivor) {
        survivor.perks.forEach((perk) => {
          if (perk) {
            if (dataMap.has(perk.name)) {
              dataMap.set(perk.name, dataMap.get(perk.name) + 1);
            } else {
              dataMap.set(perk.name, 1);
            }
          }
        });
      }
    });
  });

  return [...dataMap]
    .map((item) => {
      return {
        name: item[0],
        count: item[1],
      };
    })
    .sort((a, b) => b.count - a.count);
};

// MAPS COUNT
const getMapsData = (matches) => {
  const dataMap = new Map();

  matches.forEach((match) => {
    if (match.realmMap) {
      if (dataMap.has(match.realmMap.name)) {
        dataMap.set(match.realmMap.name, dataMap.get(match.realmMap.name) + 1);
      } else {
        dataMap.set(match.realmMap.name, 1);
      }
    }
  });

  return [...dataMap]
    .map((item) => {
      return { name: item[0], count: item[1] };
    })
    .sort((a, b) => b.count - a.count);
};

const KillerCharts = ({ matches }) => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("general");

  useEffect(() => {
    switch (chartType) {
      case "general":
        setData(getGeneralData(matches));
        break;

      case "average":
        setData(getAverageKillerData(matches));
        break;

      case "averagePerk":
        setData(getAveragePerkData(matches));
        break;

      case "survivorsCount":
        setData(getSurvivorsCount(matches));
        break;

      case "survivorPerks":
        setData(getSurvivorPerksCount(matches));
        break;

      case "mapsCount":
        setData(getMapsData(matches));
        break;

      default:
        setData(getGeneralData(matches));
        break;
    }
  }, [matches, chartType]);

  return (
    <Box>
      <FormControl sx={{ width: 300, my: 2 }}>
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
        </Select>
      </FormControl>
      <ResponsiveContainer width="100%" height={500 + data.length * 30}>
        <BarChart
          width={500}
          height={300 + data.length * 30}
          data={data}
          margin={{
            top: 5,
            right: 100,
            left: 100,
            bottom: 5,
          }}
          layout={chartType === "general" ? "horizontal" : "vertical"}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type={chartType === "general" ? "category" : "number"}
            dataKey={chartType === "general" ? "name" : "count"}
          />
          <YAxis
            type={chartType === "general" ? "number" : "category"}
            dataKey={chartType === "general" ? "count" : "name"}
          />
          {/* <Tooltip />
          <Legend /> */}
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default KillerCharts;
