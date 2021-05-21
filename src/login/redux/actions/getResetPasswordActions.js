export const GET_RESET_PASSWORD = "GET_RESET_PASSWORD";
export const GET_RESET_PASSWORD_SUCCESS = "GET_RESET_PASSWORD_SUCCESS";
export const GET_RESET_PASSWORD_FAIL = "GET_RESET_PASSWORD_FAIL";

export function getResetPassword() {
  return {
    type: GET_RESET_PASSWORD
  };
}

export function getResetPasswordConfigFail(err) {
  return {
    type: GET_RESET_PASSWORD_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
