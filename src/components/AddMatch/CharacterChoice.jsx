import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { supabase } from "../../data/supabaseClient";
import ImageSlot from "../ImageSlot";

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
        <ImageSlot
          key={character.id}
          data={character}
          containerSx={{
            width: 200,
            height: 200,
            border: "1px solid white",
            m: 1,
            "&:hover": {
              borderColor: "primary.dark",
            },
          }}
          imageSx={{
            width: 200,
            height: 200,
            objectFit: "contain",
          }}
          handleClick={() => {
            setData((prevData) => {
              return { ...prevData, character: character };
            });
            setStep((prevStep) => prevStep + 1);
          }}
        />
      ))}
    </Box>
  );
};

export default CharacterChoice;
