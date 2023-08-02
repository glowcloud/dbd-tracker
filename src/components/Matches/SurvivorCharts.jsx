import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const getGeneralData = (matches) => {
  const dataMap = new Map([
    ["escaped", 0],
    ["killed", 0],
  ]);

  matches.forEach((match) => {
    if (match.escaped) {
      dataMap.set("escaped", dataMap.get("escaped") + 1);
    } else {
      dataMap.set("killed", dataMap.get("killed") + 1);
    }
  });

  return [...dataMap].map((item) => {
    return { name: item[0], count: item[1] };
  });
};

// AVERAGE ESCAPE RATE BY SURVIVOR
const getAverageSurvivorData = (matches) => {
  const dataMap = new Map();

  matches.forEach((match) => {
    let result = 0;
    if (match.escaped) result = 1;
    if (dataMap.has(match.character.name)) {
      dataMap.set(
        match.character.name,
        dataMap.get(match.character.name) + result
      );
    } else {
      dataMap.set(match.character.name, result);
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

// AVERAGE ESCAPE RATE BY PERK
const getAveragePerkData = (matches) => {
  const dataMap = new Map();

  matches.forEach((match) => {
    let result = 0;
    if (match.escaped) result = 1;

    match.perks.forEach((perk) => {
      if (perk) {
        if (dataMap.has(perk.name)) {
          dataMap.set(perk.name, dataMap.get(perk.name) + result);
        } else {
          dataMap.set(perk.name, result);
        }
      }
    });
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

// AVERAGE KILL RATE BY KILLER
const getAverageKillerRate = (matches) => {
  const dataMap = new Map();

  matches.forEach((match) => {
    if (match.result && match.killer) {
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
      if (dataMap.has(match.killer.character.name)) {
        dataMap.set(
          match.killer.character.name,
          dataMap.get(match.killer.character.name) + result
        );
      } else {
        dataMap.set(match.killer.character.name, result);
      }
    }
  });

  return [...dataMap]
    .map((item) => {
      return {
        name: item[0],
        count:
          item[1] /
          matches.filter(
            (match) =>
              match.result && match?.killer?.character?.name === item[0]
          ).length,
      };
    })
    .sort((a, b) => b.count - a.count);
};

// AVERAGE ESCAPE RATE BY KILLER
const getAverageKillerEscapes = (matches) => {
  const dataMap = new Map();

  matches.forEach((match) => {
    if (match.killer) {
      let result = 0;
      if (match.escaped) result = 1;
      if (dataMap.has(match.killer.character.name)) {
        dataMap.set(
          match.killer.character.name,
          dataMap.get(match.killer.character.name) + result
        );
      } else {
        dataMap.set(match.killer.character.name, result);
      }
    }
  });

  return [...dataMap]
    .map((item) => {
      return {
        name: item[0],
        count:
          item[1] /
          matches.filter((match) => match?.killer?.character?.name === item[0])
            .length,
      };
    })
    .sort((a, b) => b.count - a.count);
};

// KILLERS COUNT
const getKillersCount = (matches) => {
  const dataMap = new Map();

  matches.forEach((match) => {
    if (match.killer) {
      if (dataMap.has(match.killer.character.name)) {
        dataMap.set(
          match.killer.character.name,
          dataMap.get(match.killer.character.name) + 1
        );
      } else {
        dataMap.set(match.killer.character.name, 1);
      }
    }
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

// KILLER PERKS COUNT
const getKillerPerksCount = (matches) => {
  const dataMap = new Map();

  matches.forEach((match) => {
    if (match.killer) {
      match.killer.perks.forEach((perk) => {
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

const SurvivorCharts = ({ matches }) => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("general");

  useEffect(() => {
    switch (chartType) {
      case "general":
        setData(getGeneralData(matches));
        break;
      case "average":
        setData(getAverageSurvivorData(matches));
        break;
      case "averagePerk":
        setData(getAveragePerkData(matches));
        break;
      case "killersCount":
        setData(getKillersCount(matches));
        break;
      case "averageKillerRate":
        setData(getAverageKillerRate(matches));
        break;
      case "averageKillerEscapes":
        setData(getAverageKillerEscapes(matches));
        break;
      case "killerPerksCount":
        setData(getKillerPerksCount(matches));
        break;
      case "survivorPerksCount":
        setData(getSurvivorPerksCount(matches));
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
        </Select>
      </FormControl>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={500}
          height={300}
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
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SurvivorCharts;
