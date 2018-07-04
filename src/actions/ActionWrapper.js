
export const APP_LOADED = 'APP_LOADED';
export const APP_LOADING = 'APP_LOADING';
export const APP_FETCHING = 'APP_FETCHING';
export const RESIZE_WINDOW = 'RESIZE_WINDOW';
export const RESIZE_TIMEOUT = 'RESIZE_TIMEOUT';
export const NEW_CSRF_TOKEN = 'NEW_CSRF_TOKEN';
export const REDIRECT = 'REDIRECT';

export const GET_ACTIONS_CONFIG = 'GET_ACTIONS_CONFIG';
export const GET_ACTIONS_CONFIG_SUCCESS = 'GET_ACTIONS_CONFIG_SUCCESS';
export const GET_ACTIONS_CONFIG_FAIL = 'GET_ACTIONS_CONFIG_FAIL';

export const POST_ACTIONS_ACTION = 'POST_ACTIONS_ACTION';
export const POST_ACTIONS_ACTION_SUCCESS = 'POST_ACTIONS_POST_ACTION_SUCCESS';
export const POST_ACTIONS_ACTION_FAIL = 'POST_ACTIONS_POST_ACTION_FAIL';


export function appLoaded () {
  return {
    type: APP_LOADED
  };
}

export function appLoading () {
  return {
    type: APP_LOADING
  };
}

export function appFetching () {
  return {
    type: APP_FETCHING
  };
}

export function resizeTimeout (t) {
    return {
        type: RESIZE_TIMEOUT,
        payload: {
            resize_timeout: t
        }
    };
}

export function resizeWindow (testing=false) {
    return {
        type: RESIZE_WINDOW,
        payload: {
            window_size: getWindowSize(testing)
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

export function redirect(path) {
    return {
        type: REDIRECT,
        payload: {
            path: path
        }
    };
}

export function getConfig () {
  return {
    type: GET_ACTIONS_CONFIG
  };
}

export function getConfigFail (err) {
  return {
    type: GET_ACTIONS_CONFIG_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

export function postAction () {
  return {
    type: POST_ACTIONS_ACTION
  };
}

export function postActionFail (err) {
  return {
    type: POST_ACTIONS_ACTION_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

/* Helper functions */

export function getWindowSize(testing=false) {
    if (testing) {
        return 'dummy size';
    }
    if (window.innerWidth < 768) {
        return 'xs';
    } else if (window.innerWidth < 992) {
        return 'sm';
    } else if (window.innerWidth < 1200) {
        return 'md';
    }
    return 'lg';
}

