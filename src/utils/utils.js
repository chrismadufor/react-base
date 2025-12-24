export const perPage = 10; // JSONPlaceholder doesn't support pagination, but we'll use this for display

export const getSerialNumber = (index, currentPage) => {
  let number = (currentPage - 1) * perPage + (index + 1);
  return number;
};

