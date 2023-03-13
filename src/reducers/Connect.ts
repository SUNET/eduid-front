import { createSlice } from "@reduxjs/toolkit";
import { searchUsers } from "apis/eduidConnect";

// export for use in tests
export const initialState = {
  response: [],
  loading: false,
};

export const connectSlice = createSlice({
  name: "connectReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.response = action.payload;
        state.loading = false;
      })
      .addCase(searchUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});
