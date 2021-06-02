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
