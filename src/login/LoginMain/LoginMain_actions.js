//export const APP_FETCHING = "APP_FETCHING";
export const APP_LOADED = "APP_LOADED";
export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";


export function appLoaded() {
  return {
    type: APP_LOADED
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

//export function appFetching() {
  //return {
    //type: APP_FETCHING
  //};
//}
