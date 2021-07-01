export const POST_LOGIN_REF_TO_NEXT = "POST_LOGIN_REF_TO_NEXT";
export const POST_IDP_NEXT_SUCCESS = "POST_IDP_NEXT_SUCCESS";
export const POST_IDP_NEXT_FAIL = "POST_IDP_NEXT_FAIL";

export function useLoginRef() {
  return {
    type: POST_LOGIN_REF_TO_NEXT,
  };
}

export function postRefFail(err) {
  return {
    type: POST_IDP_NEXT_FAIL,
    error: true,
    payload: {
      error: err,
      message: err,
    },
  };
}

// mock actions to trigger a set order of redirects
export const NEXT_MOCK_URL_TOU = "NEXT_MOCK_URL_TOU";
export const NEXT_MOCK_URL_MFA = "NEXT_MOCK_URL_MFA";
export const NEXT_MOCK_URL_FINISHED = "NEXT_MOCK_URL_FINISHED";

export function nextMockUrlTou() {
  return {
    type: NEXT_MOCK_URL_TOU,
  };
}
export function nextMockUrlMfa() {
  return {
    type: NEXT_MOCK_URL_MFA,
  };
}
export function nextMockUrlFinished() {
  return {
    type: NEXT_MOCK_URL_FINISHED,
  };
}