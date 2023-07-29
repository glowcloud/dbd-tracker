import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { supabase } from "../../data/supabaseClient";

const CharacterChoice = ({ side, setStep, setData }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const getCharacters = async () => {
      const { data } = await supabase.from(side).select();
      setCharacters(data);
    };

    getCharacters();
  }, [side]);

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
