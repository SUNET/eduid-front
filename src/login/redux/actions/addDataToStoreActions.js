export const ADD_NAVID_TO_STORE = "ADD_NAVID_TO_STORE";
export const ADD_COOKIE_STATUS_TO_STORE = "ADD_COOKIE_STATUS_TO_STORE";
export const ADD_LOGIN_REF_TO_STORE = "ADD_LOGIN_REF_TO_STORE";
export const ADD_TOU_VERSIONS_TO_STORE = "ADD_TOU_VERSIONS_TO_STORE";

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

export const addLoginRef = (ref) => ({
  type: ADD_LOGIN_REF_TO_STORE,
  payload: {
    ref: ref,
  },
});

export const addTouVersions = (touVersions) => ({
  type: ADD_TOU_VERSIONS_TO_STORE,
  payload: {
    touVersions: touVersions,
  },
});