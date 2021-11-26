import { createAction } from "@reduxjs/toolkit";

export const GET_NINS = "GET_NINS";

export const POST_NIN_FAIL = "POST_SECURITY_ADD_NIN_FAIL";
export const POST_NIN_SUCCESS = "POST_SECURITY_ADD_NIN_SUCCESS";

export const POST_NIN_REMOVE = "POST_NIN_REMOVE";
export const POST_NIN_REMOVE_SUCCESS = "POST_SECURITY_REMOVE_NIN_SUCCESS";
export const POST_NIN_REMOVE_FAIL = "POST_SECURITY_REMOVE_NIN_FAIL";

export function getNins() {
  return {
    type: GET_NINS,
  };
}

/* The user has entered a new NIN in the form, this action triggers sending it to the backend */
export const postNin = createAction<string>("POST_NIN");

export function postNinFail(err?: string) {
  return {
    type: POST_NIN_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}

export function startRemoveFail(err?: string) {
  return {
    type: POST_NIN_REMOVE_FAIL,
    error: true,
    payload: {
      message: err,
    },
  };
}
