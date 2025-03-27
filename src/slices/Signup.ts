import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isFSA } from "apis/common";
import { CaptchaRequest, SignupState as SignupBackendState, SignupStatusResponse } from "services/signup";

interface SignupState {
  state?: SignupBackendState;
  email?: string; // pass email address from one state to another
  given_name?: string;
  surname?: string;
  email_code?: string; // pass email code from one state to another
  captcha?: CaptchaRequest; // pass captcha response from one state to another
}

// type predicate to help identify payloads with the signup state.
function isSignupStateResponse(action: any): action is PayloadAction<SignupStatusResponse> {
  if (!isFSA(action)) {
    return false;
  }
  try {
    const payload = action.payload as unknown as SignupStatusResponse;
    // if the payload has 'state', we consider it a SignupStatusResponse
    return Boolean(payload.state !== undefined);
  } catch {
    return false;
  }
}

// type predicate for rtk queries that wrap the SignupStatusResponse
function hasSignupStateResponse(action: Action): action is PayloadAction<PayloadAction<SignupStatusResponse>> {
  if (!isFSA(action)) {
    return false;
  }
  return isSignupStateResponse(action.payload);
}

// export for use in tests
export const initialState: SignupState = {};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<{ email: string; given_name: string; surname: string }>) => {
      state.email = action.payload.email;
      state.given_name = action.payload.given_name;
      state.surname = action.payload.surname;
    },
    setEmailCode: (state, action: PayloadAction<string | undefined>) => {
      state.email_code = action.payload;
    },
    setCaptchaResponse: (state, action: PayloadAction<CaptchaRequest>) => {
      state.captcha = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(hasSignupStateResponse, (state, action) => {
      state.state = action.payload.payload.state;
    });
  },
});
