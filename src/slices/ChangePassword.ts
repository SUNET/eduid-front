import { createSlice } from "@reduxjs/toolkit";
import securityApi from "apis/eduidSecurity";

export interface ChangePasswordState {
  message?: string;
  suggested_password?: string;
}

// export for use in tests
export const initialState: ChangePasswordState = {};

const chpassSlice = createSlice({
  name: "chpass",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(securityApi.endpoints.fetchSuggestedPassword.matchFulfilled, (state, action) => {
        state.suggested_password = action.payload.payload.suggested_password;
      })
      .addMatcher(securityApi.endpoints.changePassword.matchFulfilled, (state) => {
        // On successful password change, we remove the suggested_password from state to avoid it ending up
        // in sentry or something, but also to fetch a new suggested password should the user change password again.
        state.suggested_password = undefined;
      });
  },
});

export default chpassSlice;
