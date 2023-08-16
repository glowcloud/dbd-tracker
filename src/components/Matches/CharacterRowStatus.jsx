import { Box } from "@mui/material";
import SacrificedIcon from "../../assets/other/sacrificedIcon.png";
import EscapedIcon from "../../assets/other/escapedIcon.png";

const CharacterRowStatus = ({ data }) => {
  return (
    <Box
      sx={{
        width: 100,
        height: 100,
        border: "1px solid white",
        borderRadius: "50%",
        m: 5,
      }}
    >
      {data !== null && data >= 0 && (
        <Box
          component="img"
          src={data ? EscapedIcon : SacrificedIcon}
          alt={`Status Image`}
          sx={{
            width: 75,
            height: 100,
            objectFit: "contain",
          }}
        />
      )}
    </Box>
  );
};

export default CharacterRowStatus;
