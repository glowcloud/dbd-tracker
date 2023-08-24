// GENERAL STATUS COUNT
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
      const result = match.escaped ? 1 : 0;
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

// AVERAGE ESCAPE RATE BY MAP
const getAverageMapEscapes = (matches) => {
  const dataMap = new Map();

  matches.forEach((match) => {
    if (match.realmMap) {
      const result = match.escaped ? 1 : 0;
      if (dataMap.has(match.realmMap.name)) {
        dataMap.set(
          match.realmMap.name,
          dataMap.get(match.realmMap.name) + result
        );
      } else {
        dataMap.set(match.realmMap.name, result);
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
  getAverageSurvivorData,
  getAveragePerkData,
  getAverageKillerRate,
  getAverageKillerEscapes,
  getKillersCount,
  getKillerPerksCount,
  getAverageMapEscapes,
};
