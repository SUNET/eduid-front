
export const APP_LOADED = 'APP_LOADED';
export const RESIZE_WINDOW = 'RESIZE_WINDOW';
export const RESIZE_TIMEOUT = 'RESIZE_TIMEOUT';
export const NEW_CSRF_TOKEN = 'NEW_CSRF_TOKEN';
export const REDIRECT = 'REDIRECT';


export function appLoaded () {
  return {
    type: APP_LOADED
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

