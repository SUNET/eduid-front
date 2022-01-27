/// XXX MOVE TO CONFIG SLICE

export const APP_LOADED = "APP_LOADED";
export const GET_JSCONFIG_CONFIG = "GET_JSCONFIG_CONFIG";
export const GET_JSCONFIG_CONFIG_SUCCESS = "GET_JSCONFIG_CONFIG_SUCCESS";
export const GET_JSCONFIG_CONFIG_FAIL = "GET_JSCONFIG_CONFIG_FAIL";
export const GET_INITIAL_USERDATA = "GET_INITIAL_USERDATA";
export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";

export function appLoaded() {
  return {
    type: APP_LOADED,
  };
}

export function getConfig() {
  return {
    type: GET_JSCONFIG_CONFIG,
  };
}

export function getConfigFail(err) {
  return {
    type: GET_JSCONFIG_CONFIG_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}

export function getInitialUserdata() {
  return {
    type: GET_INITIAL_USERDATA,
  };
}

// export function newCsrfToken(token) {
//   return {
//     type: NEW_CSRF_TOKEN,
//     payload: {
//       csrf_token: token,
//     },
//   };
// }
