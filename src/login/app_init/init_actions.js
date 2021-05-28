export const GET_CONFIG = "GET_JSCONFIG_LOGIN_CONFIG";
export const GET_JSCONFIG_LOGIN_CONFIG_FAIL = "GET_JSCONFIG_LOGIN_CONFIG_FAIL";
export const GET_JSCONFIG_LOGIN_CONFIG_SUCCESS = "GET_JSCONFIG_LOGIN_CONFIG_SUCCESS";

export function getConfig() {
  return {
    type: GET_CONFIG
  };
}

export function getConfigFail(err) {
  return {
    type: GET_JSCONFIG_LOGIN_CONFIG_FAIL,
    error: true,
    payload: {
      error: err,
      message: err,
    },
  };
}

