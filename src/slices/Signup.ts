import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CaptchaRequest, SignupState as SignupBackendState } from "services/signup";

interface SignupState {
  state?: SignupBackendState;
  email?: string; // pass email address from one state to another
  given_name?: string;
  surname?: string;
  email_code?: string; // pass email code from one state to another
  captcha?: CaptchaRequest; // pass captcha response from one state to another
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
    setSignupState: (state, action: PayloadAction<SignupBackendState>) => {
      state.state = action.payload;
    },
  },
});
