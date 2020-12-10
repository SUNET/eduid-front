export const POST_OIDC_PROOFING_PROOFING = "POST_OIDC_PROOFING_PROOFING";
export const POST_OIDC_PROOFING_PROOFING_SUCCESS =
  "POST_OIDC_PROOFING_PROOFING_SUCCESS";
export const POST_OIDC_PROOFING_PROOFING_FAIL =
  "POST_OIDC_PROOFING_PROOFING_FAIL";
export const SHOW_OIDC_SELEG_MODAL = "SHOW_OIDC_SELEG_MODAL";
export const HIDE_OIDC_SELEG_MODAL = "HIDE_OIDC_SELEG_MODAL";

export function postOpenidSeleg(nin) {
  return {
    type: POST_OIDC_PROOFING_PROOFING,
    payload: {
      nin: nin
    }
  };
}

export function postOpenidSelegFail(message) {
  return {
    type: POST_OIDC_PROOFING_PROOFING_FAIL,
    error: true,
    payload: {
      error: true,
      message: message
    }
  };
}

export function showOpenidSelegModal() {
  return {
    type: SHOW_OIDC_SELEG_MODAL
  };
}

export function hideOpenidSelegModal() {
  return {
    type: HIDE_OIDC_SELEG_MODAL
  };
}
