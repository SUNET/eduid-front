export const POST_REF_WEBAUTHN_OPTIONS = "POST_REF_WEBAUTHN_OPTIONS";
export const POST_IDP_MFA_AUTH_SUCCESS = "POST_IDP_MFA_AUTH_SUCCESS";
export const POST_IDP_MFA_AUTH_FAIL = "POST_IDP_MFA_AUTH_FAIL";

export function postRefToWebauthnOptions() {
  return {
    type: POST_REF_WEBAUTHN_OPTIONS,
  };
}

export function postRefToWebauthnOptionsFail(err) {
  return {
    type: POST_IDP_MFA_AUTH_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
