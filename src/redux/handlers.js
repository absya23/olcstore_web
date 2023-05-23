import { createAsyncThunk } from "@reduxjs/toolkit";
import requestGetProduct, { requestGetCata, requestGetType } from "./request";

export const handleFetchProduct = createAsyncThunk(
  "product/handleFetchProduct",
  // nếu nhiều thì ko dùng query, mà dùng VD {name, query}
  async (thunkAPI) => {
    const response = await requestGetProduct();
    return response.data;
  }
);

// ==== CATALOGUE

export const handleFetchCata = createAsyncThunk(
  "catalogue/handleFetchCata",
  async (thunkAPI) => {
    const response = await requestGetCata();
    return response.data;
  }
);

// ==== TYPE PRODUCT
export const handleFetchType = createAsyncThunk(
  "typeProduct/handleFetchType",
  async (thunkAPI) => {
    const response = await requestGetType();
    return response.data;
  }
);
