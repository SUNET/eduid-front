export const ADD_EMAIL = "ADD_EMAIL";

export const POST_EMAIL = "POST_EMAIL";
export const POST_EMAIL_SUCCESS = "POST_EMAIL_SUCCESS";
export const POST_EMAIL_FAIL = "POST_EMAIL_FAIL";
// export const ACCEPT_TOU = "ACCEPT_TOU";

// this action triggers adding user email to the store and starts the post of email to db (see login-rootSaga.js) 
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
    type: POST_EMAIL_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}
