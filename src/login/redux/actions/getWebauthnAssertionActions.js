export const GET_WEBAUTHN_ASSERTION = "GET_WEBAUTHN_ASSERTION";
export const GET_WEBAUTHN_ASSERTION_FAIL = "GET_WEBAUTHN_ASSERTION_FAIL";

export function getWebauthnAssertion(assertion) {
  return {
    type: GET_WEBAUTHN_ASSERTION,
    payload: {
      webauthn_assertion: assertion
    }
  };
}

export function cancelWebauthnAssertion() {
  return {
    type: GET_WEBAUTHN_ASSERTION_FAIL,
    payload: {
      webauthn_assertion: undefined
    }
  };
}
