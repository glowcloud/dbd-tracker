import { useEffect, useState } from "react";
import { supabase } from "../../data/supabaseClient";
import { Box, Button, TextField, Divider } from "@mui/material";

const OfferingChoice = ({ side, setStep, setData, data }) => {
  const [chosenOffering, setChosenOffering] = useState(
    data?.offering ? data.offering : null
  );
  const [offerings, setOfferings] = useState([]);
  const [choosing, setChoosing] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getOfferings = async () => {
      const { data } = await supabase
        .from("offerings")
        .select(
          `id,
            name,
            image, 
            rarity: rarity_id ( id, created_at, name )
            `
        )
        .in("side", ["both", side]);
      setOfferings(data);
    };

    getOfferings();
  }, [side]);

  const handleOfferingChoice = (offering) => {
    if (chosenOffering?.id === offering.id) {
      setChosenOffering(null);
    } else {
      setChosenOffering(offering);
    }

    setChoosing(false);
  };

  return (
    <Box>
      {/* OFFERING SLOT */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={35}
        py={10}
      >
        <Box
          sx={{
            width: 150,
            height: 150,
            border: "1px solid white",
            "&:hover": {
              borderColor: "primary.dark",
            },
          }}
          onClick={() => {
            setChoosing((prevChoosing) => !prevChoosing);
          }}
        >
          {chosenOffering && (
            <Box
              component="img"
              src={chosenOffering.image}
              alt={`${chosenOffering.name} Image`}
              sx={{
                width: 150,
                height: 150,
                objectFit: "contain",
              }}
            />
          )}
        </Box>
      </Box>

      <Button
        variant="outlined"
        sx={{ my: 5, mx: 2 }}
        onClick={() => {
          setData((prevData) => {
            return { ...prevData, offering: chosenOffering };
          });
          setStep((prevStep) => prevStep + 1);
        }}
      >
        Confirm Offering
      </Button>

      <Divider />

      {/* OFFERINGS */}
      {choosing && (
        <Box>
          {/* SEARCH BAR */}
          <Box
            component="form"
            autoComplete="off"
            px={40}
            py={5}
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              fullWidth
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            px={25}
          >
            {offerings
              .filter((offering) => offering.name.toLowerCase().includes(search))
              .map((offering) => (
                <Box
                  key={offering.id}
                  sx={{
                    m: 5,
                    width: 100,
                    height: 100,
                    border: "1px solid white",
                    "&:hover": {
                      borderColor: "primary.dark",
                    },
                  }}
                  onClick={() => {
                    handleOfferingChoice(offering);
                  }}
                >
                  <Box
                    component="img"
                    src={offering.image}
                    alt={`${offering.id} Image`}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OfferingChoice;
