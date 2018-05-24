
export const POST_SIGNUP_RESEND_VERIFICATION = 'POST_SIGNUP_RESEND_VERIFICATION';
export const POST_SIGNUP_RESEND_VERIFICATION_SUCCESS = 'POST_SIGNUP_RESEND_VERIFICATION_SUCCESS';
export const POST_SIGNUP_RESEND_VERIFICATION_FAIL = 'POST_SIGNUP_RESEND_VERIFICATION_FAIL';


export function postResendCode() {
  return {
    type: POST_SIGNUP_RESEND_VERIFICATION,
  };
}

export function postResendCodeFail (err) {
  return {
    type: POST_SIGNUP_RESEND_VERIFICATION_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

