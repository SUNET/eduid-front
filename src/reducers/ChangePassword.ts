import { createSlice } from "@reduxjs/toolkit";
import { changePassword, fetchSuggestedPassword } from "apis/eduidSecurity";

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
