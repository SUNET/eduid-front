export const GET_RESET_PASSWORD_SUCCESS = "GET_RESET_PASSWORD_FAILSUCCESS";
export const GET_RESET_PASSWORD_FAIL = "GET_RESET_PASSWORD_FAIL";

export function getResetPasswordDataFail(err) {
  return {
    type: GET_RESET_PASSWORD_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
