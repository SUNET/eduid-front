// POST_EMAIL_LINK_CODE: posts the code at the end of the email link to the backend > if successful, recieves config to load the reset password flow in the app again
export const POST_EMAIL_LINK_CODE = "POST_EMAIL_LINK_CODE";

// FROM BACKEND:
// consequences of FAIL are defined here (in _actions)
export const FROM_BACKEND_EMAIL_LINK_FAIL =
  "POST_RESET_PASSWORD_RESET_CONFIG_FAIL";
// consequences of SUCESS is defined in _reducer
export const FROM_BACKEND_EMAIL_LINK_SUCCESS =
  "POST_RESET_PASSWORD_RESET_CONFIG_SUCCESS";

// this posts the end of the email link (comes from init_container which reads the url) to the server and returns the config for entering the app again
export function useEmailLinkCode(code) {
  return {
    type: POST_EMAIL_LINK_CODE,
    payload: {
      code: code
    }
  };
}

// this triggers an error (catch(error) in saga that posts the end of the email link, email_code to the server)
export function postEmailLinkFail(err) {
  return {
    type: FROM_BACKEND_EMAIL_LINK_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}
