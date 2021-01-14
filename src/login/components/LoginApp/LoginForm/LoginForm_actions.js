export const ADD_LOGIN_DETAILS = "ADD_LOGIN_DETAILS";

// export const POST_LOGIN_DETAILS = "POST_LOGIN_DETAILS";
export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_LOGIN_FAIL = "POST_LOGIN_FAIL";
// export const ACCEPT_TOU = "ACCEPT_TOU";

// this action triggers adding user email to the store and starts the post of email to db (see login-rootSaga.js)
export function addLoginDetails(email) {
  return {
    type: ADD_LOGIN_DETAILS,
    payload: {
      email: email
      // password: password
    }
  };
}

// this triggers an error (catch(error) in saga that posts useremail to db)
export function saveLoginFail(err) {
  return {
    type: POST_LOGIN_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}
