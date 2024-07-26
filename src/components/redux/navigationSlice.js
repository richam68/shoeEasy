import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    currentRoute: "./" + window.location.href.split("/").pop(),
  },
  reducers: {
    getCurrentRoute: (state, action) => {
      state.currentRoute = action.payload;
    },
  },
});

export const { getCurrentRoute } = navigationSlice.actions;
export default navigationSlice.reducer;
