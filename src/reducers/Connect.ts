import { createSlice } from "@reduxjs/toolkit";
import { searchUsers } from "apis/eduidConnect";

// export for use in tests
export const initialState = {};

export const connectSlice = createSlice({
  name: "connectReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});
