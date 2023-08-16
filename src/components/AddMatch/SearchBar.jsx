import { Box, TextField } from "@mui/material";

const SearchBar = ({ search, setSearch, setPage }) => {
  return (
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
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
      />
    </Box>
  );
};

export default SearchBar;
