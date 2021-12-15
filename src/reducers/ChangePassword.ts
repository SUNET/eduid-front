import { createSlice } from "@reduxjs/toolkit";
import { fetchSuggestedPassword } from "apis/eduidSecurity";

export interface ChangePasswordState {
  message?: string;
  suggested_password?: string;
  old_password?: string;
  new_password?: string;
  //zxcvbn_module: undefined;
}

const initialState: ChangePasswordState = {};

const chpassSlice = createSlice({
  name: "chpass",
  initialState,
  reducers: {
    //    updateLadok: (state, action: PayloadAction<LadokData>) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSuggestedPassword.fulfilled, (state, action) => {
      state.suggested_password = action.payload;
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
