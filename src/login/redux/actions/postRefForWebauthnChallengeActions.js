export const POST_REF_WEBAUTHN_CHALLENGE = "POST_REF_WEBAUTHN_CHALLENGE";
export const POST_IDP_MFA_AUTH_SUCCESS = "POST_IDP_MFA_AUTH_SUCCESS";
export const POST_IDP_MFA_AUTH_FAIL = "POST_IDP_MFA_AUTH_FAIL";

export function postRefForWebauthnChallenge() {
  console.log("new challenge please!");
  return {
    type: POST_REF_WEBAUTHN_CHALLENGE,
  };
}

export function postRefForWebauthnChallengeFail(err) {
  return {
    type: POST_IDP_MFA_AUTH_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
