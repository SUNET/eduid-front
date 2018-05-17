
export const GET_SIGNUP_CODESTATUS = 'GET_SIGNUP_CODESTATUS';
export const GET_SIGNUP_CODESTATUS_SUCCESS = 'GET_SIGNUP_CODESTATUS_SUCCESS';
export const GET_SIGNUP_CODESTATUS_FAIL = 'GET_SIGNUP_CODESTATUS_FAIL';

export const GET_SIGNUP_VERIFY_LINK_SUCCESS = 'GET_SIGNUP_VERIFY_LINK_SUCCESS';
export const GET_SIGNUP_VERIFY_LINK_FAIL = 'GET_SIGNUP_VERIFY_LINK_FAIL';


export function getCodeStatusFail (err) {
  return {
    type: GET_SIGNUP_CODESTATUS_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}
