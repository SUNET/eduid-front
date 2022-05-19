import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(requestRemoveEmail.fulfilled, (state, action: PayloadAction<EmailsResponse>) => {
  //       state.emails = action.payload.emails;
  //     })
});
