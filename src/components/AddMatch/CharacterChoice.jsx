import { Box } from "@mui/material";

const CharacterChoice = ({ characters, setStep, setData }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexWrap="wrap"
      px={25}
    >
      {characters.map((character) => (
        <Box key={character.id}>
          <Box
            component="img"
            src={character.image}
            alt={`${character.id} Image`}
            sx={{
              width: 200,
              height: 200,
              objectFit: "contain",
            }}
            onClick={() => {
              setData((prevData) => {
                return { ...prevData, character: character };
              });
              setStep((prevStep) => prevStep + 1);
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CharacterChoice;
