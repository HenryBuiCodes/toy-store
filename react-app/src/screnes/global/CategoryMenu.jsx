import { useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { setIsCategoryOpen } from "../../state";
import Category from "../../api/category";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const isCategoryOpen = useSelector((state) => state.cart.isCategoryOpen);
  useEffect(() => {
    Category.index().then((category) => setCategory(category.data.data));
  }, []);

  return (
    <Box
      display={isCategoryOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">CATEGORY </Typography>
            <IconButton onClick={() => dispatch(setIsCategoryOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box className="flex flex-col gap-5">
            {Array.isArray(category) &&
              category.map((item) => {
                return (
                  <Box
                    key={item.id}
                    className="w-full border rounded-md p-5 text-sm cursor-pointer"
                    onClick={() => {
                      navigate(`/category/${item.id}`);
                      dispatch(setIsCategoryOpen({}));
                    }}
                  >
                    {item.attributes.name}
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
