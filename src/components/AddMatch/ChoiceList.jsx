import { Box } from "@mui/material";
import CustomPagination from "../CustomPagination";
import ImageSlot from "../ImageSlot";
import SearchBar from "./SearchBar";

const ChoiceList = ({
  filteredChoices,
  handleChoice,
  itemsCount,
  itemsPerPage,
  search,
  setSearch,
  page,
  setPage,
  customConSx,
  customImgSx,
}) => {
  return (
    <Box>
      {/* SEARCH BAR */}
      <SearchBar search={search} setSearch={setSearch} setPage={setPage} />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        px={{ lg: 25, xl: 55 }}
      >
        {filteredChoices.map((choice) => (
          <ImageSlot
            key={choice.id}
            data={choice}
            containerSx={{
              m: 5,
              border: "1px solid white",
              "&:hover": {
                borderColor: "primary.dark",
              },
              ...customConSx,
            }}
            imageSx={{
              objectFit: "contain",
              ...customImgSx,
            }}
            handleClick={() => handleChoice(choice)}
          />
        ))}
      </Box>

      <CustomPagination
        itemsCount={itemsCount}
        itemsPerPage={itemsPerPage}
        page={page}
        setPage={setPage}
      />
    </Box>
  );
};

export default ChoiceList;
