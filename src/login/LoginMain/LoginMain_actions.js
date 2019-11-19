export const APP_FETCHING = "APP_FETCHING";

export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";


export function appFetching() {
  return {
    type: APP_FETCHING
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
