import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
  isCartOpen: false,
  cart: cookies.get("addToCartList") || [],
  items: [],
};

const handleCookie = (cart) => {
  // const cookies = new Cookies();
  const newObj = JSON.parse(JSON.stringify(cart));

  // cookies.remove("addToCartList");
  cookies.set("addToCartList", cart, { path: "/" });
  const cartFromCookie = cookies.get("addToCartList");
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      if (state.cart.length === 0) {
        state.cart = [...state.cart, action.payload.item];
      } else {
        state.cart = state.cart.map((item) => {
          if (item.id === action.payload.item.id) {
            return { ...item, count: action.payload.item.count + item.count };
          }
          return item;
        });
        const isItemInCart = state.cart.some(
          (item) => item.id === action.payload.item.id
        );
        if (!isItemInCart) {
          state.cart = [...state.cart, action.payload.item];
        }
      }

      // Save the updated cart data to a cookie

      handleCookie(state.cart);
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },

    removeAllFromCart: (state) => {
      state.cart = [];
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.count++;
        }
        return item;
      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  removeAllFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
