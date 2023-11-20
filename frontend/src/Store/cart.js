import { createSlice } from '@reduxjs/toolkit';
import * as R from 'ramda';

const initialState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initCart: (state, action) => {
      return {
        ...state,
        carts: action.payload,
      };
    },
    deleteItemFromCart: (state, action) => {
      const book_id = action.payload;
      return {
        ...state,
        carts: state.carts.filter((item) => item.book_id !== book_id),
      };
    },
    addItemToCart: (state, action) => {
      const { cart } = action.payload;
      const index = R.findIndex(R.propEq(cart.book_id, 'book_id'))(state.carts);
      if (index >= 0) {
        return {
          ...state,
          carts: state.carts.map((item, i) =>
            i === index ? { ...item, amount: item.amount + 1 } : item,
          ),
        };
      }
      return {
        ...state,
        carts: [...state.carts, cart],
      };
    },
    setAmount: (state, action) => {
      const { book_id, amount } = action.payload;
      return {
        ...state,
        carts: state.carts.map((item) => {
          if (item.book_id === book_id) {
            return {
              ...item,
              amount: amount,
            };
          }
          return item;
        }),
      };
    },
    setCheckbox: (state, action) => {
      const { book_id, checkbox} = action.payload;
      return {
        ...state,
        carts: state.carts.map((item) => {
          if (item.book_id === book_id) {
            return {
              ...item,
              checkbox: checkbox,
            };
          }
          return item;
        }),
      };
    },
    clearCart: (state) => {
      return {
        ...state,
        carts: [],
      };
    },
  },
});

export const getLengthCarts = (state) => state?.cartReducer?.carts?.length;
export const {
  initCart,
  clearCart,
  setAmount,
  deleteItemFromCart,
  addItemToCart,
  setCheckbox,
} = cartSlice.actions;
export default cartSlice.reducer;
