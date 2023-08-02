export const paginate = (data, itemsPerPage, currentPage) => {
  if (data)
    return data.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  return data;
};
