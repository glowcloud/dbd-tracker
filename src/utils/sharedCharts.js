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

export { getSurvivorsCount, getSurvivorPerksCount, getMapsData };
