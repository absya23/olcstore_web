import { createAction, createSlice } from "@reduxjs/toolkit";
import { handleFetchCata } from "./handlers";

export const setLoading = createAction("setLoading");

const initialState = {
  data: [],
  loading: true,
  errorMessage: "",
};

const catalogueSlice = createSlice({
  name: "catalogue",
  initialState,
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
  },
  // promise thì đưa vào đây
  extraReducers: (builder) => {
    builder
      .addCase(handleFetchCata.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(handleFetchCata.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(handleFetchCata.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(setLoading, (state, action) => {
        state.loading = action.payload;
      });
  },
});

// export const { setQuery } = catalogueSlice.actions;

export default catalogueSlice.reducer;
