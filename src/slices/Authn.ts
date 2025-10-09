import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authnApi from "apis/eduidAuthn";
import securityApi from "apis/eduidSecurity";
import { FRONTEND_ACTION } from "components/Common/MultiFactorAuthentication";

interface FrontendActionAndState {
  frontend_action: string;
  frontend_state?: string;
}

export interface AuthnState extends Partial<FrontendActionAndState> {
  re_authenticate: boolean;
  response?: FrontendActionAndState;
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
      sessionStorage.clear();
    },
    setFrontendActionAndState: (state, action: PayloadAction<FrontendActionAndState>) => {
      state.frontend_action = action.payload.frontend_action;
      state.frontend_state = action.payload.frontend_state;
      sessionStorage.setItem(FRONTEND_ACTION, action.payload.frontend_action);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authnApi.endpoints.authnGetStatus.matchFulfilled, (state, action) => {
      state.frontend_action = undefined;
      state.frontend_state = undefined;
      state.response = action.payload.payload;
    });
    builder.addMatcher(securityApi.endpoints.checkAuthnStatus.matchFulfilled, (state, action) => {
      if (state.response !== undefined) {
        state.response.frontend_action = action.payload.payload.frontend_action;
      }
    });
  },
});

export default authnSlice;
