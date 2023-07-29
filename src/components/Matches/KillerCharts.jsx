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

// AVERAGE KILL COUNT BY KILLER
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

// AVERAGE KILL COUNT BY PERK
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

const KillerCharts = ({ matches, chartType }) => {
  const [data, setData] = useState([]);

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

export default KillerCharts;
