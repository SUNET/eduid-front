import {createAction} from "@reduxjs/toolkit";

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

// Add the login reference (currently an UUID extracted from the URL), to the store.
export const addLoginRef = createAction("addLoginRef");

// During app initialisation, we figure out what versions of the TOU we have. This action stores that in the store.
export const addTouVersions = createAction("addTouVersions");

// Store the result from navigator.credentials.get() in the state, after the user used a webauthn credential.
export const addWebauthnAssertion = createAction("addWebauthnAssertion");
