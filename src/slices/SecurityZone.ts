import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SecurityZoneState {
  re_authenticate: boolean;
  frontend_action?: string;
  frontend_state?: string;
}

// export this for use in tests
export const initialState: SecurityZoneState = {
  re_authenticate: false,
};

const securityZoneSlice = createSlice({
  name: "security_zone",
  initialState,
  reducers: {
    setReAuthenticate: (state, action: PayloadAction<boolean>) => {
      console.log("setReAuthenticate");
      state.re_authenticate = action.payload;
    },
    setFrontendAction: (state, action: PayloadAction<string>) => {
      console.log("setFrontendAction");
      state.frontend_action = action.payload;
    },
    setFrontendState: (state, action: PayloadAction<string>) => {
      console.log("setFrontendState");
      state.frontend_state = action.payload;
    },
  },
});
export default securityZoneSlice;
