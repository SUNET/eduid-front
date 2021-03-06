export const CAPTCHA_VERIFICATION = "CAPTCHA_VERIFICATION";

export const POST_SIGNUP_TRYCAPTCHA = "POST_SIGNUP_TRYCAPTCHA";
export const POST_SIGNUP_TRYCAPTCHA_SUCCESS = "POST_SIGNUP_TRYCAPTCHA_SUCCESS";
export const POST_SIGNUP_TRYCAPTCHA_FAIL = "POST_SIGNUP_TRYCAPTCHA_FAIL";

export function verifyCaptcha(response) {
  return {
    type: CAPTCHA_VERIFICATION,
    payload: {
      response: response
    }
  };
}

export function postCaptcha() {
  return {
    type: POST_SIGNUP_TRYCAPTCHA,
    payload: {
      disabledButton: true
    }
  };
}

export function postCaptchaFail(err) {
  return {
    type: POST_SIGNUP_TRYCAPTCHA_FAIL,
    error: true,
    payload: {
      message: err,
      disabledButton: false
    }
  };
}
