import { createSlice } from "@reduxjs/toolkit";
import { searchUsers } from "apis/eduidConnect";

// export for use in tests
export const initialState = {
  response: [],
};

export const connectSlice = createSlice({
  name: "connectReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      state.response = action.payload;
    });
  },
});
