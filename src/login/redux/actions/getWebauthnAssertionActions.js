export const GET_WEBAUTHN_ASSERTION = "GET_WEBAUTHN_ASSERTION";
export const CANCLE_WEBAUTHN_ASSERTION = "CANCLE_WEBAUTHN_ASSERTION";

export function getWebauthnAssertion(assertion) {
  return {
    type: GET_WEBAUTHN_ASSERTION,
    payload: {
      webauthn_assertion: assertion
    }
  };
}

export function cancleWebauthnAssertion() {
  return {
    type: CANCLE_WEBAUTHN_ASSERTION,
    payload: {
      webauthn_assertion: undefined
    }
  };
}
