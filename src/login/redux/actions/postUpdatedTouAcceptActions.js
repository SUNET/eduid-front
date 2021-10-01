export const POST_UPDATED_TOU_ACCEPT = "POST_UPDATED_TOU_ACCEPT";
export const POST_IDP_TOU_FAIL = "POST_IDP_TOU_FAIL";

export function updatedTouAccept(version) {
  return {
    type: POST_UPDATED_TOU_ACCEPT,
    payload: {
      user_accepts: version,
    },
  };
}

export function updateTouAcceptFail(err) {
  return {
    type: POST_IDP_TOU_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
