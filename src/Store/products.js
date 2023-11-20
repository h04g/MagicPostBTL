import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    initProducts: (state, action) => {
      return {
        ...state,
        products: action.payload,
      };
    },
    addProduct: (state, action) => {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    },
  },
});
export const { addProduct, initProducts } = productSlice.actions;
export default productSlice.reducer;
