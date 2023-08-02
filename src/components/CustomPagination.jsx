import { Pagination, Stack } from "@mui/material";

const CustomPagination = ({ itemsCount, itemsPerPage, page, setPage }) => {
  return (
    <Stack alignItems="center" justifyContent="center" my={2}>
      <Pagination
        count={Math.ceil(itemsCount / itemsPerPage)}
        page={page + 1}
        onChange={(event, value) => setPage(value - 1)}
        color="primary"
      />
    </Stack>
  );
};

export default CustomPagination;
