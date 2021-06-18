export const POST_UPDATED_TOU_ACCEPT = "POST_UPDATED_TOU_ACCEPT";
export const POST_IDP_TOU_SUCCESS = "POST_IDP_TOU_SUCCESS";
export const POST_IDP_TOU_FAIL = "PPOST_IDP_TOU_FAIL";

export function updatedTouAccept() {
  return {
    type: POST_UPDATED_TOU_ACCEPT,
    payload: {
      user_accepts: "2016-v1",
    },
  };
}

export function updateTouAcceptFail(err) {
  return {
    type: POST_IDP_TOU_FAIL,
    error: true,
    payload: {
      error: err,
      message: err,
    },
  };
}
