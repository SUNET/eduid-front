import { createSlice } from "@reduxjs/toolkit";
import { authnGetStatus } from "apis/eduidAuthn";

export interface AuthnState {
  frontend_action?: string;
  frontend_state?: string;
}

// export for use in tests
export const initialState: AuthnState = {};

const authnSlice = createSlice({
  name: "authn",
  initialState,
  reducers: {
    setFrontendActionState: (state) => {
      state.frontend_action = undefined;
      state.frontend_state = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authnGetStatus.fulfilled, (state, action) => {
      state.frontend_action = action.payload.frontend_action;
      state.frontend_state = action.payload.frontend_state;
    });
  },
});

export default authnSlice;
