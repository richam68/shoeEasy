import { createSlice } from "@reduxjs/toolkit";

const searchBarSlice = createSlice({
  name: "searchbar",
  initialState: {},
  reducers: {
    cacheResults: (state, action) => {
      state = {
        ...state,
        ...action.payload,
      };

      return state;
    },

    clearCacheResults: () => {
      return {};
    },
  },
});

export const { cacheResults, clearCacheResults } = searchBarSlice.actions;
export default searchBarSlice.reducer;
