export const DEAL_WITH_EMAIL = "DEAL_WITH_EMAIL";
export const POST_RESET_PASSWORD_RESET_SUCCESS = "POST_RESET_PASSWORD_RESET_SUCCESS"
export const POST_RESET_PASSWORD_RESET_FAIL = "POST_RESET_PASSWORD_RESET_FAIL"


export function dealWithEmail(email) {
  return {
    type: DEAL_WITH_EMAIL,
    payload: {
      email: email
    }
  };
}

export function postEmailFail(err) {
  return {
    type: POST_RESET_PASSWORD_RESET_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}
