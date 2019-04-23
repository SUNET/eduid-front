
export const GET_NINS = 'GET_NINS';
export const GET_NINS_SUCCESS = 'GET_PERSONAL_DATA_NINS_SUCCESS';
export const GET_NINS_FAIL = 'GET_PERSONAL_DATA_NINS_FAIL';
export const POST_NIN_REMOVE = 'POST_NIN_REMOVE';
export const POST_NIN_REMOVE_SUCCESS = 'POST_SECURITY_REMOVE_NIN_SUCCESS';
export const POST_NIN_REMOVE_FAIL = 'POST_SECURITY_REMOVE_NIN_FAIL';


export function getNins () {
  return {
    type: GET_NINS,
  };
}

export function getNinsFail (err) {
  return {
    type: GET_NINS_FAIL,
    error: true,
    payload: {
      error: err,
      message: err.toString()
    }
  };
}

export function startRemove (nin) {
  return {
    type: POST_NIN_REMOVE,
    payload: {
      nin: nin
    }
  };
}

export function startRemoveFail (err) {
  return {
    type: POST_NIN_REMOVE_FAIL,
    error: true,
    payload: {
      error: err,
      message: err.toString()
    }
  };
}
