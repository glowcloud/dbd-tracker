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

const getGeneralData = (matches) => {
  const dataMap = new Map([
    ["escaped", 0],
    ["killed", 0],
    ["disconnected", 0],
  ]);

  matches.forEach((match) => {
    if (match.status) {
      dataMap.set(match.status, dataMap.get(match.status) + 1);
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
    if (match.status) {
      let result = 0;
      if (match.status === "escaped") result = 1;
      if (dataMap.has(match.character.id)) {
        dataMap.set(
          match.character.id,
          dataMap.get(match.character.id) + result
        );
      } else {
        dataMap.set(match.character.id, result);
      }
    }
  });

  return [...dataMap]
    .map((item) => {
      return {
        name: item[0],
        count:
          item[1] /
          matches.filter((match) => match.character.id === item[0]).length,
      };
    })
    .sort((a, b) => b.count - a.count);
};

// AVERAGE ESCAPE RATE BY PERK
const getAveragePerkData = (matches) => {
  const dataMap = new Map();

  matches.forEach((match) => {
    if (match.status) {
      let result = 0;
      if (match.status === "escaped") result = 1;

      match.perks.forEach((perk) => {
        if (perk) {
          if (dataMap.has(perk.id)) {
            dataMap.set(perk.id, dataMap.get(perk.id) + result);
          } else {
            dataMap.set(perk.id, result);
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
            match.perks.some((perk) => perk !== null && perk.id === item[0])
          ).length,
      };
    })
    .sort((a, b) => b.count - a.count);
};

const SurvivorCharts = ({ matches, chartType }) => {
  const [data, setData] = useState([]);

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
      default:
        setData(getGeneralData(matches));
        break;
    }
  }, [matches, chartType]);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SurvivorCharts;
