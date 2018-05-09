
export const GET_CODE_STATUS = 'GET_CODE_STATUS';
export const APP_LOADED = 'APP_LOADED';
export const RESIZE_WINDOW = 'RESIZE_WINDOW';

export const ADD_EMAIL = 'ADD_EMAIL';

export const GET_SIGNUP_CODESTATUS = 'GET_SIGNUP_CODESTATUS';
export const GET_SIGNUP_CODESTATUS_SUCCESS = 'GET_SIGNUP_CODESTATUS_SUCCESS';
export const GET_SIGNUP_CODESTATUS_FAIL = 'GET_SIGNUP_CODESTATUS_FAIL';

export const GET_SIGNUP_CONFIG = 'GET_SIGNUP_CONFIG';
export const GET_SIGNUP_CONFIG_SUCCESS = 'GET_SIGNUP_CONFIG_SUCCESS';
export const GET_SIGNUP_CONFIG_FAIL = 'GET_SIGNUP_CONFIG_FAIL';
export const NEW_CSRF_TOKEN = 'NEW_CSRF_TOKEN';

export function getCodeStatus (code) {
    return {
        type: GET_CODE_STATUS,
        payload: {
            code: code
        }            
    };
}


export function appLoaded () {
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


export function addEmail (email) {
    return {
        type: ADD_EMAIL,
        payload: {
            email: email
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

export function getConfig () {
  return {
    type: GET_SIGNUP_CONFIG
  };
}

export function getConfigFail (err) {
  return {
    type: GET_SIGNUP_CONFIG_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

export function newCsrfToken(token) {
    return {
        type: NEW_CSRF_TOKEN,
        payload: {
            csrf_token: token
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
