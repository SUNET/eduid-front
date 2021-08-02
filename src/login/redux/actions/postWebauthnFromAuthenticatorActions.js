export const POST_WEBAUTHN_ASSERTION = "POST_WEBAUTHN_ASSERTION";
export const POST_WEBAUTHN_ASSERTION_FAIL = "POST_WEBAUTHN_ASSERTION_FAIL";

export function postWebauthnFromAuthenticator() {
  return {
    type: POST_WEBAUTHN_ASSERTION,
  };
}

export function postWebauthnFromAuthenticatorFail(err) {
  return {
    type: POST_WEBAUTHN_ASSERTION_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
