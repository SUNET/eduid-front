export const DEAL_WITH_EMAIL = "DEAL_WITH_EMAIL";
export const POST_EMAIL_FAIL = "POST_EMAIL_FAIL";


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
    type: POST_EMAIL_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}
