import { createSlice } from "@reduxjs/toolkit";
import { changePassword, fetchSuggestedPassword } from "apis/eduidSecurity";

export interface ChangePasswordState {
  message?: string;
  suggested_password?: string;
  // old_password?: string;
  // new_password?: string;
  //zxcvbn_module: undefined;
}

const initialState: ChangePasswordState = {};

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

// let chpassReducer = (state = chpass, action) => {
//   switch (action.type) {
//     case actions.GET_SUGGESTED_PASSWORD:
//       return {
//         ...state,
//       };
//     case actions.GET_SUGGESTED_PASSWORD_SUCCESS:
//       return {
//         ...state,
//         ...action.payload,
//       };
//     case actions.GET_SUGGESTED_PASSWORD_FAIL:
//       return {
//         ...state,
//         message: action.payload.message,
//       };
//     case actions.POST_PASSWORD_CHANGE:
//       return {
//         ...state,
//         old_password: action.payload.old,
//         new_password: action.payload.next,
//       };
//     case actions.POST_SECURITY_CHANGE_PASSWORD_SUCCESS:
//       return {
//         ...state,
//         ...action.payload,
//       };
//     case actions.SET_ZXCVBN:
//       return {
//         ...state,
//         zxcvbn_module: action.payload.module,
//       };
//     default:
//       return state;
//   }
// };
// export default chpassReducer;

export default chpassSlice;
