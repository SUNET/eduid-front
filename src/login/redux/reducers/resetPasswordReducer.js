import * as resetPasswordActions from "../actions/resetPasswordActions";
import * as getWebauthnActions from "../actions/getWebauthnAssertionActions";
import { createReducer } from "@reduxjs/toolkit";

const resetPasswordData = {
    email_address: "",
    email_code: "",
    phone: {},
    webauthn_assertion: null,
    selected_option: null,
    new_password: null
};

const resetPasswordReducer = createReducer(resetPasswordData, {
  [resetPasswordActions.savePhoneCode]: (state, action) => {
    state.phone_code = action.payload
  },
  [resetPasswordActions.requestEmailLink]: (state, action) => {
    state.email_address = action.payload
  },
  [resetPasswordActions.saveLinkCode]: (state, action) => {
    state.email_code = action.payload
  },
  [resetPasswordActions.useLinkCode]: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  },
  "POST_RESET_PASSWORD_VERIFY_EMAIL_SUCCESS": (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  },
  [resetPasswordActions.requestPhoneCode]: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  },
  [resetPasswordActions.savePhoneCode] : (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  },
  [getWebauthnActions.GET_WEBAUTHN_ASSERTION]: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  },
  [getWebauthnActions.GET_WEBAUTHN_ASSERTION_FAIL]: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  },
  [resetPasswordActions.selectExtraSecurity] : (state, action) => {
    state.selected_option = action.payload
  },
  [resetPasswordActions.storeNewPassword]: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  },
})

export default resetPasswordReducer;
