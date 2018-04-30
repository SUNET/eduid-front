
export const GET_CODE_STATUS = 'GET_CODE_STATUS';
export const APP_LOADED = 'APP_LOADED';
export const RESIZE_WINDOW = 'RESIZE_WINDOW';

export const GET_SIGNUP_CODESTATUS = 'GET_SIGNUP_CODESTATUS';
export const GET_SIGNUP_CODESTATUS_SUCCESS = 'GET_SIGNUP_CODESTATUS_SUCCESS';
export const GET_SIGNUP_CODESTATUS_FAIL = 'GET_SIGNUP_CODESTATUS_FAIL';


export function getCodeStatus (code) {
    return {
        type: GET_CODE_STATUS,
        payload: {
            code: code
        }            
    };
}


export function appLoaded (err) {
  return {
    type: APP_LOADED
  };
}


export function resizeWindow () {
    return {
        type: RESIZE_WINDOW,
        payload: {
            window_size: getWindowSize()
        }
    };
}

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

/* Helper functions */

export function getWindowSize() {
    if (window.innerWidth < 768) {
        return 'xs';
    } else if (window.innerWidth < 992) {
        return 'sm';
    } else if (window.innerWidth < 1200) {
        return 'md';
    }
    return 'lg';
}
