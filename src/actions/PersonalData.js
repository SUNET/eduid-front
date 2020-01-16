export const GET_ALL_USERDATA = "GET_ALL_USERDATA";
export const GET_ALL_USERDATA_SUCCESS =
  "GET_PERSONAL_DATA_ALL_USER_DATA_SUCCESS";
export const GET_ALL_USERDATA_FAIL = "GET_PERSONAL_DATA_ALL_USER_DATA_FAIL";
export const GET_USERDATA_SUCCESS = "GET_PERSONAL_DATA_USER_SUCCESS";
export const CHANGE_USERDATA = "CHANGE_USERDATA";
export const POST_USERDATA = "POST_USERDATA";
export const POST_USERDATA_SUCCESS = "POST_PERSONAL_DATA_USER_SUCCESS";
export const POST_USERDATA_FAIL = "POST_PERSONAL_DATA_USER_FAIL";

export function getAllUserdata() {
  return {
    type: GET_ALL_USERDATA
  };
}

export function getAllUserdataFail(err) {
  return {
    type: GET_ALL_USERDATA_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}

export function changeUserdata(data) {
  return {
    type: CHANGE_USERDATA,
    payload: data
  };
}

export function postUserdata() {
  return {
    type: POST_USERDATA
  };
}

export function postUserdataFail(err) {
  return {
    type: POST_USERDATA_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}
