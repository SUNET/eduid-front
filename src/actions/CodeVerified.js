export const GET_CODE_STATUS = "GET_CODE_STATUS";
export const GET_SIGNUP_VERIFY_LINK_SUCCESS = "GET_SIGNUP_VERIFY_LINK_SUCCESS";
export const GET_SIGNUP_VERIFY_LINK_FAIL = "GET_SIGNUP_VERIFY_LINK_FAIL";


export function getCodeStatus(code) {
  return {
    type: GET_CODE_STATUS,
    payload: {
      code: code
    }
  };
}

export function getCodeStatusFail(err) {
  return {
    type: GET_SIGNUP_VERIFY_LINK_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}
