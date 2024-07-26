import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "productFilter",
  initialState: {
    categoryFilter: [],
    brandFilter: [],
    finalPrice: [500, 7000],
    currentRating: null,
    brandAccordianState: [true, true],
    sortBy: "recommended",
    currentPaginationPage: 1,
  },
  reducers: {
    clearAll: (state) => {
      const { categoryFilter, brandFilter, finalPrice, currentRating, sortBy, currentPaginationPage } =
        state;

      if (
        categoryFilter.length === 0 &&
        brandFilter.length === 0 &&
        currentRating === null &&
        sortBy === "recommended" &&
        finalPrice[0] === 500 &&
        finalPrice[1] === 7000 && 
        currentPaginationPage === 1
      ) {
        return;
      }

      state.categoryFilter = [];
      state.brandFilter = [];
      state.finalPrice = [500, 7000];
      state.currentRating = null;
      state.brandAccordianState = [true, true];
      state.sortBy = "recommended";
      state.currentPaginationPage = 1;
    },

    updateCategoryFilter: (state, action) => {
      const updatedCategory = [...state.categoryFilter];

      const newFilter = action.payload;
      if (updatedCategory.indexOf(newFilter) !== -1) {
        updatedCategory.splice(updatedCategory.indexOf(newFilter), 1);
      } else {
        updatedCategory.push(newFilter);
      }
      state.categoryFilter = updatedCategory;
    },

    updateBrandFilter: (state, action) => {
      const updatedCategory = [...state.brandFilter];

      const newFilter = action.payload;
      if (updatedCategory.indexOf(newFilter) !== -1) {
        updatedCategory.splice(updatedCategory.indexOf(newFilter), 1);
      } else {
        updatedCategory.push(newFilter);
      }
      state.brandFilter = updatedCategory;
    },

    updatePriceFilter: (state, action) => {
      state.finalPrice = [...action.payload];
    },

    updateCurrentRating: (state, action) => {
      state.currentRating = action.payload;
    },

    updateBrandAccordianState: (state, action) => {
      const updatedAccordianState = [...state.brandAccordianState];
      updatedAccordianState[action.payload[0]] = action.payload[1];
      state.brandAccordianState = updatedAccordianState;
    },

    updateSortBy: (state, action) => {
      state.sortBy = action.payload;
    },

    updateCurrentPaginationPage: (state, action)=>{
      state.currentPaginationPage = action.payload; 
    }
  },
});

export const {
  clearAll,
  updatePriceFilter,
  updateCurrentRating,
  updateCategoryFilter,
  updateBrandFilter,
  updateBrandAccordianState,
  updateSortBy,
  updateCurrentPaginationPage,
} = filterSlice.actions;
export default filterSlice.reducer;
