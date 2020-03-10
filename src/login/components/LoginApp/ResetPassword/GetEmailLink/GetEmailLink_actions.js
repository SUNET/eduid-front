// ADD_EMAIL: adds user email adress into store
export const ADD_EMAIL = "ADD_EMAIL";

// FROM BACKEND:
// consequences of FAIL are defined here (in _actions)
export const FROM_BACKEND_EMAIL_FAIL = "POST_EMAIL_FAIL";
// consequences of SUCESS is defined in _reducer
export const FROM_BACKEND_EMAIL_SUCCESS = "POST_RESET_PASSWORD_RESET_SUCCESS";

// this action triggers adding user email to the store (triggers the post of email to backend, see login-rootSaga.js)
export function addEmail(email) {
  return {
    type: ADD_EMAIL,
    payload: {
      email: email
    }
  };
}

// this triggers an error (catch(error) in saga that posts useremail to db)
export function saveEmailFail(err) {
  return {
    type: FROM_BACKEND_EMAIL_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}
