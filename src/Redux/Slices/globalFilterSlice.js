// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// export const globalFilterF = createAsyncThunk(
//   "globalFilterF",
//   async (data, { rejectWithValue }) => {
//     return;
//   }
// );

// const FilterSlice = createSlice({
//   name: "query",
//   initialState: {
//     query: "",
//   },
//   extraReducers: (builder) => {
//     builder.addCase(globalFilterF.fulfilled, (state, action) => {
//       state.query = action.payload;
//     });
//   },
// });

// export default FilterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Define the action
export const setGlobalFilter = (query) => ({
  type: 'query/setGlobalFilter',
  payload: query,
});

// Create the slice
const FilterSlice = createSlice({
  name: "query",
  initialState: {
    query: "",
  },
  reducers: {
    setGlobalFilter: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setGlobalFilter: setGlobalFilterAction } = FilterSlice.actions;
export default FilterSlice.reducer;

