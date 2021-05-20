export const ADD_NAVID_TO_STORE = "ADD_NAVID_TO_STORE";
export const ADD_COOKIE_STATUS_TO_STORE = "ADD_COOKIE_STATUS_TO_STORE";

export const addNavId = (navId) => ({
  type: ADD_NAVID_TO_STORE,
  payload: {
    navId: navId,
  },
});

export const checkCookieStatus = (status) => ({
  type: ADD_COOKIE_STATUS_TO_STORE,
  payload: {
    hasCookie: status,
  },
});
