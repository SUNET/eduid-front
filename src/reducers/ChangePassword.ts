import { createSlice } from "@reduxjs/toolkit";
import { authnGetStatus } from "apis/eduidAuthn";
import { changePassword, fetchSuggestedPassword } from "apis/eduidSecurity";

export interface ChangePasswordState {
  authn_id?: string;
  suggested_password?: string;
}

// export for use in tests
export const initialState: ChangePasswordState = {};

const chpassSlice = createSlice({
  name: "chpass",
  initialState,
  reducers: {
    clearAuthentication: (state) => {
      state.authn_id = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authnGetStatus.fulfilled, (state, action) => {
        if (action.payload.method === "authenticate") {
          state.authn_id = action.payload.authn_id;
        }
      })
      .addCase(fetchSuggestedPassword.fulfilled, (state, action) => {
        state.suggested_password = action.payload;
      })
      .addCase(changePassword.fulfilled, (state) => {
        // On successful password change, we remove the suggested_password from state to avoid it ending up
        // in sentry or something, but also to fetch a new suggested password should the user change password again.
        state.suggested_password = undefined;
      });
  },
});

export default chpassSlice;
