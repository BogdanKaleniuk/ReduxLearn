import { createSlice } from '@reduxjs/toolkit';

const filtersInitialState = {
  value: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setStatusFilter(state, action) {
      state.value = action.payload;
    },
  },
});
export const { setStatusFilter } = filtersSlice.actions;
export const filterReducer = filtersSlice.reducer;
