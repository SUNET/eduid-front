import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isFSA } from "apis/common";
import {
  CaptchaRequest,
  fetchTryCaptcha,
  fetchVerifyLink,
  isTryCaptchaResponse,
  isVerifyLinkResponse,
  SignupStatusResponse,
  TryCaptchaNextStep,
  VerifyLinkResponse,
} from "apis/eduidSignup";

interface SignupState {
  state?: SignupStatusResponse;
  email?: string; // pass email address from one state to another
  email_code?: string; // pass email code from one state to another
  captcha?: CaptchaRequest; // pass captcha response from one state to another
  tou_accepted: boolean;
  current_step: "register" | TryCaptchaNextStep;
  // Fetching verify-link is a one-shot operation, so we have to store the response in
  // redux state (rather than in component state) in case switching language causes us
  // to re-render the component
  verify_link_response?: VerifyLinkResponse;
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
    setEmailCode: (state, action: PayloadAction<string | undefined>) => {
      state.email_code = action.payload;
    },
    setCaptchaResponse: (state, action: PayloadAction<CaptchaRequest>) => {
      state.captcha = action.payload;
    },
    setToUAccepted: (state, action: PayloadAction<boolean>) => {
      state.tou_accepted = action.payload;
    },
    setSignupState: (state, action: PayloadAction<SignupStatusResponse>) => {
      state.state = action.payload;
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
      })
      .addCase(fetchVerifyLink.fulfilled, (state, action) => {
        state.verify_link_response = action.payload;
      })
      .addCase(fetchVerifyLink.rejected, (state, action) => {
        // action.payload is the whole JSON response from the backend (or some other error)
        if (isFSA(action.payload) && isVerifyLinkResponse(action.payload.payload)) {
          state.verify_link_response = action.payload.payload;
        }
      });
  },
});
