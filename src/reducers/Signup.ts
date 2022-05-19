import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTryCaptcha } from "apis/eduidSignup";

interface SignupState {
  email?: string;
  tou_accepted: boolean;
  current_step: "register" | "new" | "resend-code" | "address-used";
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
    builder.addCase(fetchTryCaptcha.fulfilled, (state, action) => {
      state.current_step = action.payload.next;
    });
  },
});
