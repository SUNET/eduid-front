export const POST_USERNAME_PASSWORD = "POST_USERNAME_PASSWORD";
export const POST_IDP_PW_AUTH_SUCCESS = "POST_IDP_PW_AUTH_SUCCESS";
 export const POST_IDP_PW_AUTH_FAIL = "POST_IDP_PW_AUTH_FAIL";

export function postUsernamePassword(username, password) {
  return {
    type: POST_USERNAME_PASSWORD,
    payload: {
      username: username,
      password: password,
    },
  };
}

export function postUsernamePasswordFail(err) {
  return {
    type: POST_IDP_PW_AUTH_FAIL,
    error: true,
    payload: {
      error: err,
      message: err,
    },
  };
}

