import { Box, Typography, Divider } from "@mui/material";
import ImageSlot from "../ImageSlot";
import SacrificedIcon from "../../assets/other/sacrificedIcon.png";
import EscapedIcon from "../../assets/other/escapedIcon.png";

const CharacterRow = ({ data, player, side, noResult }) => {
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
      <ImageSlot
        data={data?.character}
        containerSx={{
          width: 150,
          height: 150,
          border: "1px solid white",
          m: 2,
        }}
        imageSx={{
          width: 150,
          height: 150,
          objectFit: "contain",
        }}
      />

      <Divider orientation="vertical" flexItem />

      {/* SURVIVOR ITEM */}
      {side === "survivor" && (
        <ImageSlot
          data={data?.item}
          containerSx={{
            width: 75,
            height: 75,
            border: "1px solid white",
            m: 2,
          }}
          imageSx={{
            width: 75,
            height: 75,
            objectFit: "contain",
          }}
        />
      )}

      {/* ADDONS */}
      {data?.addons
        ? data.addons.map((addon, addonIndex) => (
            <ImageSlot
              key={addonIndex}
              data={addon}
              containerSx={{
                width: 50,
                height: 50,
                border: "1px solid white",
                m: 2,
              }}
              imageSx={{
                width: 50,
                height: 50,
                objectFit: "contain",
              }}
            />
          ))
        : [null, null].map((addon, addonIndex) => (
            <ImageSlot
              key={addonIndex}
              data={addon}
              containerSx={{
                width: 50,
                height: 50,
                border: "1px solid white",
                m: 2,
              }}
            />
          ))}
      <Divider orientation="vertical" flexItem />

      {/* OFFERING */}
      <ImageSlot
        data={data?.offering}
        containerSx={{
          width: 75,
          height: 75,
          border: "1px solid white",
          m: 2,
        }}
        imageSx={{
          width: 75,
          height: 75,
          objectFit: "contain",
        }}
      />
      <Divider orientation="vertical" flexItem />

      {/* PERKS */}
      {data?.perks
        ? data.perks.map((perk, perkIndex) => (
            <ImageSlot
              key={perkIndex}
              data={perk}
              containerSx={{
                width: 75,
                height: 75,
                transform: "rotate(45deg)",
                border: "1px solid white",
                m: 5,
              }}
              imageSx={{
                width: 75,
                height: 75,
                objectFit: "contain",
                transform: "rotate(-45deg)",
              }}
            />
          ))
        : [null, null, null, null].map((perk, perkIndex) => (
            <ImageSlot
              key={perkIndex}
              data={perk}
              containerSx={{
                width: 75,
                height: 75,
                transform: "rotate(45deg)",
                border: "1px solid white",
                m: 5,
              }}
            />
          ))}
      {!noResult && <Divider orientation="vertical" flexItem />}

      {/* RESULT */}
      {!noResult && side === "killer" && (
        <Typography variant="h5" px={5}>
          {data?.result ? data.result : ""}
        </Typography>
      )}
      {!noResult && side === "survivor" && (
        <Box
          sx={{
            width: 100,
            height: 100,
            border: "1px solid white",
            borderRadius: "50%",
            m: 5,
          }}
        >
          {data?.escaped !== null && data?.escaped >= 0 && (
            <Box
              component="img"
              src={data.escaped ? EscapedIcon : SacrificedIcon}
              alt={`Status Image`}
              sx={{
                width: 75,
                height: 100,
                objectFit: "contain",
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default CharacterRow;
