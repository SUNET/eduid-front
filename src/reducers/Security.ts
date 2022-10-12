import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { beginRegisterWebauthn, registerWebauthn, requestCredentials } from "apis/eduidSecurity";
import { createAuthentication } from "login/app_utils/helperFunctions/navigatorCredential";
import { safeDecodeCBOR, safeEncode } from "sagas/common";
// import * as actions from "actions/Security";

export const GET_CREDENTIALS_SUCCESS = createAction("GET_SECURITY_CREDENTIALS_SUCCESS");
export const getCredentials = createAction("GET_CREDENTIALS");

export interface SecurityState {
  message?: string;
  credentials: any;
  code?: string;
  confirming_change: boolean;
  location: string;
  deleted: boolean;
  // webauthn_asking_description: boolean;
  webauthn_token_description?: string;
  webauthn_failed: boolean;
  webauthn_attestation: any;
  webauthn_token_remove: string;
  webauthn_token_verify: string;
  webauthn_authenticator: string;
}

// export this for use in tests
export const initialState: SecurityState = {
  message: "",
  credentials: [],
  code: "",
  confirming_change: false, // Show a modal when the user clicks 'change password'
  location: "",
  deleted: false,
  // webauthn_asking_description: false,
  webauthn_token_description: "",
  webauthn_failed: false,
  webauthn_attestation: {},
  webauthn_token_remove: "",
  webauthn_token_verify: "",
  webauthn_authenticator: "",
};

const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    chooseAuthenticator: (state, action: any) => {
      return {
        ...state,
        webauthn_authenticator: action.payload,
      };
    },
    startChangePassword: (state, action: any) => {
      return {
        ...state,
        confirming_change: true,
      };
    },
    stopChangePassword: (state, action: any) => {
      return {
        ...state,
        confirming_change: false,
      };
    },

    // startWebAuthnRegistration: (state, action: any) => {
    //   return {
    //     webauthn_failed: false,
    //     webauthn_token_description: action.payload.description,
    //   };
    // },
    // startAskWebauthnDescription: (state, action: any) => {
    //   return {
    //     webauthn_failed: false,
    //     webauthn_asking_description: true,
    //   };
    // },
    // stopAskWebauthnDescription: (state, action: any) => {
    //   return {
    //     webauthn_failed: false,
    //     webauthn_asking_description: false,
    //   };
    // },
    // postWebauthnRemove: (state, action: any) => {
    //   return {
    //     webauthn_token_remove: action.payload.token,
    //     webauthn_failed: false,
    //   };
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(createAuthentication.fulfilled, (state, action) => {
      // Store the result from navigator.credentials.get() in the state, after the user used a webauthn credential.
      state.webauthn_attestation = action.payload;
    });
    builder.addCase(registerWebauthn.fulfilled, (state, action) => {
      // Store the result from navigator.credentials.get() in the state, after the user used a webauthn credential.
      state.webauthn_attestation = action.payload;
    });
    builder.addCase(requestCredentials.fulfilled, (state, action) => {
      state.credentials = action.payload;
    });
    // builder.addCase(beginRegisterWebauthn.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.webauthn_attestation = action.payload;
    // });
    // builder.addCase(getCredentials.fulfilled, (state, action: PayloadAction<any>) => {});
    // builder.addCase(postDeleteAccount.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.location = action.payload.location;
    // });
    // builder.addCase(getDeleteAccount.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.deleted = true;
    // });
    // builder.addCase(postWebauthnBegin.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.webauthn_failed = false;
    //   state.webauthn_attestation = action.payload.attestation;
    // });
    // builder.addCase(postWebauthnRegister.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.webauthn_failed = false;
    // });
    // builder.addCase(postWebauthnRemove.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.webauthn_failed = false;
    // });
    // builder.addCase(postWebauthnRemove.rejected, (state, action: PayloadAction<any>) => {
    //   state.webauthn_failed = true;
    // });
  },
});
export default securitySlice;

// const securityReducer = (state = initialState, action: PayloadAction<any>) => {
//   switch (action.type) {
//     case actions.GET_CREDENTIALS_SUCCESS:
//       return {
//         ...state,
//         ...action.payload,
//       };
//     case actions.GET_CREDENTIALS_FAIL:
//       return {
//         ...state,
//         message: action.payload.message,
//       };
//     case actions.START_CHANGE_PASSWORD:
//       return {
//         ...state,
//         confirming_change: true,
//       };
//     case actions.STOP_CHANGE_PASSWORD:
//       return {
//         ...state,
//         confirming_change: false,
//       };
//     case actions.GET_CHANGE_PASSWORD:
//       return {
//         ...state,
//         confirming_change: false,
//       };
//     case actions.GET_CHANGE_PASSWORD_FAIL:
//       return {
//         ...state,
//         message: action.payload.message,
//       };
//     case actions.POST_DELETE_ACCOUNT_SUCCESS:
//       return {
//         ...state,
//         location: action.payload.location,
//       };
//     case actions.POST_DELETE_ACCOUNT_FAIL:
//       return {
//         ...state,
//         message: action.payload.message,
//       };
//     case actions.GET_DELETE_ACCOUNT_SUCCESS:
//       return {
//         ...state,
//         deleted: true,
//       };
//     case actions.GET_DELETE_ACCOUNT_FAIL:
//       return {
//         ...state,
//         message: action.payload.message,
//       };
//     case actions.START_WEBAUTHN_REGISTRATION:
//       return {
//         ...state,
//         webauthn_failed: false,
//         webauthn_token_description: action.payload.description,
//       };
//     case actions.START_ASK_WEBAUTHN_DESCRIPTION:
//       return {
//         ...state,
//         webauthn_failed: false,
//         webauthn_asking_description: true,
//       };
//     case actions.STOP_ASK_WEBAUTHN_DESCRIPTION:
//       return {
//         ...state,
//         webauthn_failed: false,
//         webauthn_asking_description: false,
//       };
//     case actions.POST_WEBAUTHN_BEGIN_FAIL:
//       return {
//         ...state,
//         webauthn_failed: true,
//         message: action.payload.message,
//       };
//     case actions.POST_WEBAUTHN_BEGIN_SUCCESS:
//       return {
//         ...state,
//         webauthn_failed: false,
//         webauthn_attestation: action.payload.attestation,
//       };
//     case actions.POST_WEBAUTHN_REGISTER_SUCCESS:
//       return {
//         ...state,
//         ...action.payload,
//         webauthn_failed: false,
//       };
//     case actions.POST_WEBAUTHN_REGISTER_FAIL:
//       return {
//         ...state,
//         ...action.payload,
//         webauthn_failed: true,
//       };
//     case actions.POST_WEBAUTHN_REMOVE:
//       return {
//         ...state,
//         webauthn_token_remove: action.payload.token,
//         webauthn_failed: false,
//       };
//     case actions.POST_WEBAUTHN_REMOVE_FAIL:
//       return {
//         ...state,
//         webauthn_failed: true,
//       };
//     case actions.POST_WEBAUTHN_REMOVE_SUCCESS:
//       return {
//         ...state,
//         ...action.payload,
//         webauthn_failed: false,
//       };
//     case actions.POST_WEBAUTHN_VERIFY:
//       return {
//         ...state,
//         webauthn_token_verify: action.payload.token,
//         webauthn_failed: false,
//       };
//     case actions.POST_WEBAUTHN_VERIFY_FAIL:
//       return {
//         ...state,
//         webauthn_failed: true,
//       };
//     case actions.AUTHENTICATOR:
//       return {
//         ...state,
//         webauthn_authenticator: action.payload.choice,
//       };
//     default:
//       return state;
//   }
// };
