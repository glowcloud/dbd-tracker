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

// AVERAGE KILL RATE BY MAP
const getAverageMapData = (matches) => {
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
      if (match.realmMap) {
        if (dataMap.has(match.realmMap.name)) {
          dataMap.set(
            match.realmMap.name,
            dataMap.get(match.realmMap.name) + result
          );
        } else {
          dataMap.set(match.realmMap.name, result);
        }
      }
    }
  });

  return [...dataMap]
    .map((item) => {
      return {
        name: item[0],
        count:
          item[1] /
          matches.filter((match) => match?.realmMap?.name === item[0]).length,
      };
    })
    .sort((a, b) => b.count - a.count);
};

export {
  getGeneralData,
  getAverageKillerData,
  getAveragePerkData,
  getAverageMapData,
};
