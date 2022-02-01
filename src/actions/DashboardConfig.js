/// XXX MOVE TO CONFIG SLICE

export const APP_LOADED = "APP_LOADED";
export const GET_INITIAL_USERDATA = "GET_INITIAL_USERDATA";
export const NEW_CSRF_TOKEN = "NEW_CSRF_TOKEN";

export function appLoaded() {
  return {
    type: APP_LOADED,
  };
}

export function getInitialUserdata() {
  return {
    type: GET_INITIAL_USERDATA,
  };
}
