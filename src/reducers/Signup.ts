import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isFSA } from "apis/common";
import { fetchTryCaptcha, isTryCaptchaResponse, TryCaptchaNextStep, TryCaptchaResponse } from "apis/eduidSignup";
import { response } from "msw";

interface SignupState {
  email?: string;
  tou_accepted: boolean;
  current_step: "register" | TryCaptchaNextStep;
}

// export for use in tests
export const initialState: SignupState = {
  tou_accepted: false,
  current_step: "register",
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string | undefined>) => {
      state.email = action.payload;
    },
    setToUAccepted: (state, action: PayloadAction<boolean>) => {
      state.tou_accepted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTryCaptcha.fulfilled, (state, action) => {
        state.current_step = action.payload.next;
      })
      .addCase(fetchTryCaptcha.rejected, (state, action) => {
        // action.payload is the whole JSON response from the backend (or some other error)
        if (isFSA(action.payload) && isTryCaptchaResponse(action.payload.payload)) {
          /* A TryCaptcha request can be declined with e.g. the following payload:
           *
           *   "payload": {
           *     "message": "signup.registering-address-used",
           *     "next": "address-used"
           *   }
           *
           * In which case we want to set current_step to "address-used".
           */
          state.current_step = action.payload.payload.next;
        }
      });
  },
});
