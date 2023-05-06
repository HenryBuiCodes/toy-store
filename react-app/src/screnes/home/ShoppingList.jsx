import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import {
  IconButton,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import ItemApi from "../../api/item";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  ArrowDownward,
  ArrowUpward,
  SearchOutlined,
} from "@mui/icons-material";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  // const [sortBy, setSortBy] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [pageCount, setPageCount] = useState();
  const [total, setTotal] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangePagination = (event, value) => {
    setPage(value);
  };

  async function getAllItems(
    pageNumber,
    itemsPerPage,
    currentStage,
    searchParams
  ) {
    const response = await ItemApi.index({
      page: pageNumber,
      pageSize: itemsPerPage,
      status: currentStage,
      search: searchParams,
      sort: sort,
    });
    const items = response.data.data;
    const pagination = response.data.meta.pagination;
    setPage(pagination.page);
    setPageSize(pagination.pageSize);
    setPageCount(pagination.pageCount);
    setTotal(pagination.total);
    dispatch(setItems(items));
  }

  useEffect(() => {
    getAllItems(page, pageSize, value, search, sort);
  }, [page, pageSize, value, search, sort]); // eslint-disable-line react-hooks/exhaustive-deps

  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated"
  );
  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );
  const bestSellersItems = items.filter(
    (item) => item.attributes.category === "bestSellers"
  );

  const handleSorting = () => {
    if (sort === "desc") {
      setSort("asc");
    } else {
      setSort("desc");
    }
  };

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box className=" flex justify-end mb-6 ">
        <Box className=" grid grid-cols-6">
          <Box className="border rounded-xl col-span-5 w-full flex">
            <input
              type="text"
              className=" w-full h-full px-4 py-2 focus:outline-none hover:border-r-lg"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search"
            />
            <IconButton sx={{ color: "black" }}>
              <SearchOutlined />
            </IconButton>
          </Box>
          <Box className="col-span-1 flex items-center justify-end mr-6">
            {sort === "desc" ? (
              <IconButton sx={{ color: "black" }} onClick={handleSorting}>
                <ArrowDownward />
              </IconButton>
            ) : (
              <IconButton sx={{ color: "black" }} onClick={handleSorting}>
                <ArrowUpward />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "bestSellers" &&
          bestSellersItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
      <Box className="w-full mt-8 flex justify-center items-center">
        <Stack spacing={4}>
          <Pagination
            page={page}
            count={pageCount}
            variant="outlined"
            color="primary"
            size="large"
            onChange={handleChangePagination}
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
      </Box>
    </Box>
  );
};

export default ShoppingList;
