import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authnGetStatus } from "apis/eduidAuthn";

export interface AuthnState {
  re_authenticate: boolean;
  frontend_action?: string;
  frontend_state?: string;
  response?: {
    frontend_action?: string;
    frontend_state?: string;
  };
}

// export for use in tests
export const initialState: AuthnState = { re_authenticate: false };

const authnSlice = createSlice({
  name: "authn",
  initialState,
  reducers: {
    setReAuthenticate: (state, action: PayloadAction<boolean>) => {
      state.re_authenticate = action.payload;
    },
    setAuthnFrontendReset: (state) => {
      state.frontend_action = undefined;
      state.frontend_state = undefined;
      state.response = undefined;
    },
    setFrontendAction: (state, action: PayloadAction<string>) => {
      state.frontend_action = action.payload;
    },
    setFrontendState: (state, action: PayloadAction<string>) => {
      state.frontend_state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authnGetStatus.fulfilled, (state, action) => {
      state.frontend_action = undefined;
      state.frontend_state = undefined;
      state.response = action.payload;
    });
  },
});

export default authnSlice;
