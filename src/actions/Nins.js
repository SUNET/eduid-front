export const GET_NINS = "GET_NINS";
export const GET_NINS_SUCCESS = "GET_PERSONAL_DATA_NINS_SUCCESS";
export const GET_NINS_FAIL = "GET_PERSONAL_DATA_NINS_FAIL";

export const POST_NIN = "POST_NIN";
export const POST_NIN_FAIL = "POST_SECURITY_ADD_NIN_FAIL"
export const POST_NIN_SUCCESS =  "POST_SECURITY_ADD_NIN_SUCCESS"

export const POST_NIN_REMOVE = "POST_NIN_REMOVE";
export const POST_NIN_REMOVE_SUCCESS = "POST_SECURITY_REMOVE_NIN_SUCCESS";
export const POST_NIN_REMOVE_FAIL = "POST_SECURITY_REMOVE_NIN_FAIL";
export const CHANGE_NINDATA = "CHANGE_NINDATA"

export const SHOW_NIN_PROFILE = "SHOW_NIN_PROFILE";
export const SHOW_NIN_IDENTITY = "SHOW_NIN_IDENTITY";

export function getNins() {
  return {
    type: GET_NINS
  };
}

export function getNinsFail(err) {
  return {
    type: GET_NINS_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}

export function postNin(nin) {
  return {
    type: POST_NIN,
    payload: {
      nin: nin
    }
  };
}

export function postNinFail(err) {
  return {
    type: POST_NIN_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}


export function startRemove(nin) {
  return {
    type: POST_NIN_REMOVE,
    payload: {
      nin: nin
    }
  };
}

export function startRemoveFail(err) {
  return {
    type: POST_NIN_REMOVE_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}

export function changeNindata(data) {
  return {
    type: CHANGE_NINDATA,
    payload: data
  };
}

export function showNinAtProfile() {
  return {
    type: SHOW_NIN_PROFILE
  };
}

export function showNinAtIdentity() {
  return {
    type: SHOW_NIN_IDENTITY
  };
}