import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PaginationItem, Stack, Pagination } from "@mui/material";

const PaginationComponent = ({
  pageNumber,
  pageSize,
  pageCount,
  total,
  setPageNumber,
  setPageSize,
}) => {
  const handleChange = (event, value) => {
    setPageNumber(value);
  };
  return (
    <Stack spacing={4}>
      <Pagination
        count={10}
        variant="outlined"
        color="primary"
        size="large"
        onChange={handleChange}
        renderItem={(item) => {
          return (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          );
        }}
      />
    </Stack>
  );
};

export default PaginationComponent;
