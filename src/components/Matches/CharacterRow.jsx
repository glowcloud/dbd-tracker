import { Box, Typography, Divider } from "@mui/material";

const CharacterRow = ({ data, player, side }) => {
  console.log(data);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="1px solid"
      borderColor={player ? "primary.dark" : "grey"}
      my={2}
    >
      {/* CHARACTER */}
      <Box
        sx={{
          width: 150,
          height: 150,
          border: "1px solid white",
          m: 2,
        }}
      >
        {data?.character && (
          <Box
            component="img"
            src={data.character.image}
            alt={`${data.character.name} Image`}
            sx={{
              width: 150,
              height: 150,
              objectFit: "contain",
            }}
          />
        )}
      </Box>
      <Divider orientation="vertical" flexItem />

      {side === "survivor" && (
        <Box
          sx={{
            width: 75,
            height: 75,
            border: "1px solid white",
            m: 2,
          }}
        >
          {data?.item && (
            <Box
              component="img"
              src={data.item.image}
              alt={`${data.item.id} Image`}
              sx={{
                width: 75,
                height: 75,
                objectFit: "contain",
              }}
            />
          )}
        </Box>
      )}

      {/* ADDONS */}
      {data?.addons
        ? data.addons.map((addon, addonIndex) => (
            <Box
              key={addonIndex}
              sx={{
                width: 50,
                height: 50,
                border: "1px solid white",
                m: 2,
              }}
            >
              {addon && (
                <Box
                  component="img"
                  src={addon.image}
                  alt={`${addon.id} Image`}
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>
          ))
        : [null, null].map((addon, addonIndex) => (
            <Box
              key={addonIndex}
              sx={{
                width: 50,
                height: 50,
                border: "1px solid white",
                m: 2,
              }}
            >
              {addon && (
                <Box
                  component="img"
                  src={addon.image}
                  alt={`${addon.id} Image`}
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>
          ))}
      <Divider orientation="vertical" flexItem />

      {/* OFFERING */}
      <Box
        sx={{
          width: 75,
          height: 75,
          border: "1px solid white",
          m: 2,
        }}
      >
        {data?.offering && (
          <Box
            component="img"
            src={data.offering.image}
            alt={`${data.offering.id} Image`}
            sx={{
              width: 75,
              height: 75,
              objectFit: "contain",
            }}
          />
        )}
      </Box>
      <Divider orientation="vertical" flexItem />

      {/* PERKS */}
      {data?.perks
        ? data.perks.map((perk, perkIndex) => (
            <Box
              key={perkIndex}
              sx={{
                width: 75,
                height: 75,
                transform: "rotate(45deg)",
                border: "1px solid white",
                m: 5,
              }}
            >
              {perk && (
                <Box
                  component="img"
                  src={perk.image}
                  alt={`${perk.id} Image`}
                  sx={{
                    width: 75,
                    height: 75,
                    objectFit: "contain",
                    transform: "rotate(-45deg)",
                  }}
                />
              )}
            </Box>
          ))
        : [null, null, null, null].map((perk, perkIndex) => (
            <Box
              key={perkIndex}
              sx={{
                width: 75,
                height: 75,
                transform: "rotate(45deg)",
                border: "1px solid white",
                m: 5,
              }}
            ></Box>
          ))}
      <Divider orientation="vertical" flexItem />

      {/* RESULT */}
      <Typography variant="h5" px={5}>
        {side === "killer"
          ? data?.result
            ? data.result
            : ""
          : data?.escaped
          ? data.escaped === 1
            ? "Escaped"
            : "Killed"
          : ""}
      </Typography>
    </Box>
  );
};

export default CharacterRow;
