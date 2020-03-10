export const POST_LOGOUT = "POST_LOGOUT";
export const POST_AUTHN_LOGOUT_SUCCESS = "POST_AUTHN_LOGOUT_SUCCESS";
export const POST_AUTHN_LOGOUT_FAIL = "POST_AUTHN_LOGOUT_FAIL";

export function startLogout() {
  return {
    type: POST_LOGOUT
  };
}

export function postLogoutFail(err) {
  return {
    type: POST_AUTHN_LOGOUT_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}
