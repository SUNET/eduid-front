export const GET_NINS = "GET_NINS";

export const POST_NIN = "POST_NIN";
export const POST_NIN_FAIL = "POST_SECURITY_ADD_NIN_FAIL";
export const POST_NIN_SUCCESS = "POST_SECURITY_ADD_NIN_SUCCESS";

export const POST_NIN_REMOVE = "POST_NIN_REMOVE";
export const POST_NIN_REMOVE_SUCCESS = "POST_SECURITY_REMOVE_NIN_SUCCESS";
export const POST_NIN_REMOVE_FAIL = "POST_SECURITY_REMOVE_NIN_FAIL";

export function getNins() {
  return {
    type: GET_NINS,
  };
}

export function postNin(nin) {
  return {
    type: POST_NIN,
    payload: {
      nin: nin,
    },
  };
}

export function postNinFail(err) {
  return {
    type: POST_NIN_FAIL,
    error: true,
    payload: {
      message: err.toString(),
    },
  };
}

export function startRemoveFail(err) {
  return {
    type: POST_NIN_REMOVE_FAIL,
    error: true,
    payload: {
      message: err.toString(),
    },
  };
}
