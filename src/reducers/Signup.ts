import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isFSA } from "apis/common";
import { fetchTryCaptcha, fetchVerifyLink, isTryCaptchaResponse, TryCaptchaNextStep } from "apis/eduidSignup";

export interface SignupState {
  email?: string;
  tou_accepted: boolean;
  current_step: "register" | TryCaptchaNextStep;
  code?: string;

  status?: string;
  dashboard_url?: string;
  password?: string;
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
    saveVerifyLinkCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    useVerifyLinkCode: () => {},
  },
  extraReducers: (builder) => {
    builder
      //TODO: add action type, do not know why get error with action:VerifyLinkResponseSuccess
      .addCase(fetchVerifyLink.fulfilled, (state, action: any) => {
        state.status = action.payload.status;
        state.dashboard_url = action.payload.dashboard_url;
        state.password = action.payload.password;
        state.email = action.payload.email;
      })
      .addCase(fetchVerifyLink.rejected, (state, action: any) => {
        state.status = action.payload?.payload.status;
      })
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
