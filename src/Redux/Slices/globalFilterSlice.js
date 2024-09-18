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

