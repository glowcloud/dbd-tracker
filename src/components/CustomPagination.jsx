import { Pagination, Stack } from "@mui/material";

const CustomPagination = ({
  itemsCount,
  itemsPerPage,
  currentPage,
  setPage,
}) => {
  return (
    <Stack alignItems="center" justifyContent="center" my={2}>
      <Pagination
        count={Math.ceil(itemsCount / itemsPerPage)}
        page={currentPage + 1}
        onChange={() => setPage((event, value) => setPage(value - 1))}
        color="primary"
      />
    </Stack>
  );
};

export default CustomPagination;
