import { createAction, createSlice } from "@reduxjs/toolkit";
import { handleFetchType } from "./handlers";

export const setLoading = createAction("setLoading");

const initialState = {
	data: [],
	loading: true,
	errorMessage: "",
};

const typeProductSlice = createSlice({
	name: "typeProduct",
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
			.addCase(handleFetchType.fulfilled, (state, action) => {
				state.data = action.payload;
				state.loading = false;
			})
			.addCase(handleFetchType.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(handleFetchType.rejected, (state, action) => {
				state.loading = false;
			})
			.addCase(setLoading, (state, action) => {
				state.loading = action.payload;
			});
	},
});

// export const { setQuery } = typeProductSlice.actions;

export default typeProductSlice.reducer;
