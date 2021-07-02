export const POST_TOU_VERSIONS = "POST_TOU_VERSIONS";
export const POST_IDP_TOU_SUCCESS = "POST_IDP_TOU_SUCCESS";
export const POST_IDP_TOU_FAIL = "POST_IDP_TOU_FAIL";

export function postTouVersions(versions) {
  return {
    type: POST_TOU_VERSIONS,
    payload: {
      versions: versions,
    },
  };
}

export function postTouVersionsFail(err) {
  return {
    type: POST_IDP_TOU_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
