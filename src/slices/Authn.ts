import { createSlice } from "@reduxjs/toolkit";
import { authnGetStatus } from "apis/eduidAuthn";

export interface AuthnState {
  frontend_action?: string;
}

// export for use in tests
export const initialState: AuthnState = {};

const authnSlice = createSlice({
  name: "authn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authnGetStatus.fulfilled, (state, action) => {
      state.frontend_action = action.payload.frontend_action;
    });
  },
});

export default authnSlice;
