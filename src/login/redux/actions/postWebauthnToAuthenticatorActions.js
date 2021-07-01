export const POST_WEBAUTHN_ASSERTION = "POST_WEBAUTHN_ASSERTION";
export const POST_WEBAUTHN_ASSERTION_FAIL = "POST_WEBAUTHN_ASSERTION_FAIL";

export function postWebauthnToAuthenticator(assertion) {
  return {
    type: POST_WEBAUTHN_ASSERTION,
    payload: {
      assertion,
    },
  };
}

export function postWebauthnToAuthenticatorFail(err) {
  return {
    type: POST_WEBAUTHN_ASSERTION_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
