import { createAction, createSlice } from "@reduxjs/toolkit";
import { handleFetchProduct } from "./handlers";

export const setLoading = createAction("setLoading");

const initialState = {
  data: [],
  loading: true,
  errorMessage: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    setQuery: (state, action) => ({
      ...state,
      query: action.payload,
    }),
  },
  // promise thì đưa vào đây
  extraReducers: (builder) => {
    builder
      .addCase(handleFetchProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(handleFetchProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleFetchProduct.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(setLoading, (state, action) => {
        state.loading = action.payload;
      });
  },
});

export const { setQuery } = productSlice.actions;

export default productSlice.reducer;
