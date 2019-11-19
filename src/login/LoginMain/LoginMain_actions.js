export const APP_FETCHING = "APP_FETCHING";
export const RESIZE_WINDOW = "RESIZE_WINDOW";
export const RESIZE_TIMEOUT = "RESIZE_TIMEOUT";

export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";


export function appFetching() {
  return {
    type: APP_FETCHING
  };
}

export function resizeTimeout(t) {
  return {
    type: RESIZE_TIMEOUT,
    payload: {
      resize_timeout: t
    }
  };
}

export function resizeWindow(testing = false) {
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

/* Helper functions */

export function getWindowSize(testing = false) {
  if (testing) {
    return "dummy size";
  }
  if (window.innerWidth < 768) {
    return "xs";
  } else if (window.innerWidth < 992) {
    return "sm";
  } else if (window.innerWidth < 1200) {
    return "md";
  }
  return "lg";
}
