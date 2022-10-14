import { createAction } from "@reduxjs/toolkit";

export const GET_CHANGE_PASSWORD = "GET_CHANGE_PASSWORD";
export const GET_CHANGE_PASSWORD_SUCCESS = "GET_CHANGE_PASSWORD_SUCCESS";
export const GET_CHANGE_PASSWORD_FAIL = "GET_CHANGE_PASSWORD_FAIL";
export const START_CHANGE_PASSWORD = "START_CHANGE_PASSWORD";
export const STOP_CHANGE_PASSWORD = "STOP_CHANGE_PASSWORD";

export const POST_DELETE_ACCOUNT = "POST_DELETE_ACCOUNT";
export const SEND_POST_DELETE_ACCOUNT = "SEND_POST_DELETE_ACCOUNT";
export const POST_DELETE_ACCOUNT_SUCCESS = "POST_SECURITY_TERMINATE_ACCOUNT_SUCCESS";
export const POST_DELETE_ACCOUNT_FAIL = "POST_SECURITY_TERMINATE_ACCOUNT_FAIL";
export const GET_DELETE_ACCOUNT = "GET_SECURITY_ACCOUNT_TERMINATED";
export const GET_DELETE_ACCOUNT_SUCCESS = "GET_SECURITY_ACCOUNT_TERMINATED_SUCCESS";
export const GET_DELETE_ACCOUNT_FAIL = "GET_SECURITY_ACCOUNT_TERMINATED_FAIL";
// export const START_WEBAUTHN_REGISTRATION = "START_WEBAUTHN_REGISTRATION";
// export const POST_WEBAUTHN_BEGIN_FAIL = "POST_WEBAUTHN_WEBAUTHN_REGISTER_BEGIN_FAIL";
// export const POST_WEBAUTHN_BEGIN_SUCCESS = "POST_WEBAUTHN_WEBAUTHN_REGISTER_BEGIN_SUCCESS";
// export const POST_WEBAUTHN_REGISTER_FAIL = "POST_WEBAUTHN_WEBAUTHN_REGISTER_COMPLETE_FAIL";
// export const POST_WEBAUTHN_REGISTER_SUCCESS = "POST_WEBAUTHN_WEBAUTHN_REGISTER_COMPLETE_SUCCESS";
// export const POST_WEBAUTHN_REMOVE = "POST_WEBAUTHN_WEBAUTHN_REMOVE";
// export const POST_WEBAUTHN_REMOVE_SUCCESS = "POST_WEBAUTHN_WEBAUTHN_REMOVE_SUCCESS";
// export const POST_WEBAUTHN_REMOVE_FAIL = "POST_WEBAUTHN_WEBAUTHN_REMOVE_FAIL";
// export const POST_WEBAUTHN_VERIFY = "POST_WEBAUTHN_VERIFY";
// export const POST_WEBAUTHN_VERIFY_FAIL = "POST_WEBAUTHN_VERIFY_FAIL";
// export const AUTHENTICATOR = "AUTHENTICATOR";

// export function getCredentials() {
//   return {
//     type: GET_CREDENTIALS,
//   };
// }

// export function getCredentialsFail(err) {
//   return {
//     type: GET_CREDENTIALS_FAIL,
//     error: true,
//     payload: {
//       message: err,
//     },
//   };
// }

// this action doesn't GET anything, it starts SHOWING the change password components
export const initiatePasswordChange = createAction(GET_CHANGE_PASSWORD);

export function getPasswordChangeFail(err) {
  return {
    type: GET_CHANGE_PASSWORD_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}

export function confirmDeletion() {
  return {
    type: POST_DELETE_ACCOUNT,
  };
}

export function postConfirmDeletion() {
  return {
    type: SEND_POST_DELETE_ACCOUNT,
  };
}

export function removeAccountFail(err) {
  return {
    type: POST_DELETE_ACCOUNT_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}

export function accountRemovedFail(err) {
  return {
    type: GET_DELETE_ACCOUNT_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}

// export function startWebauthnRegistration(description) {
//   return {
//     type: START_WEBAUTHN_REGISTRATION,
//     payload: {
//       description: description,
//     },
//   };
// }

// export function beginWebauthnFail(err) {
//   return {
//     type: POST_WEBAUTHN_BEGIN_FAIL,
//     error: true,
//     payload: {
//       message: err,
//     },
//   };
// }

// export function registerWebauthnFail(err) {
//   return {
//     type: POST_WEBAUTHN_REGISTER_FAIL,
//     error: true,
//     payload: {
//       message: err,
//     },
//   };
// }

// export function postRemoveWebauthnToken(token) {
//   return {
//     type: POST_WEBAUTHN_REMOVE,
//     payload: {
//       token: token,
//     },
//   };
// }

// export function tokenRemovedFail(err) {
//   return {
//     type: POST_WEBAUTHN_REMOVE_FAIL,
//     error: true,
//     payload: {
//       message: err,
//     },
//   };
// }

// export function postVerifyWebauthnToken(token) {
//   return {
//     type: POST_WEBAUTHN_VERIFY,
//     payload: {
//       token: token,
//     },
//   };
// }

// export function tokenVerifyFail(err) {
//   return {
//     type: POST_WEBAUTHN_VERIFY_FAIL,
//     error: true,
//     payload: {
//       message: err,
//     },
//   };
// }

// export function chooseAuthenticator(choice) {
//   return {
//     type: AUTHENTICATOR,
//     payload: {
//       choice: choice,
//     },
//   };
// }
