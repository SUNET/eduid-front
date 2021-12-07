import { createAction } from "@reduxjs/toolkit";
import { PersonalDataData } from "reducers/PersonalData";

export const GET_ALL_USERDATA_SUCCESS = "GET_PERSONAL_DATA_ALL_USER_DATA_SUCCESS";
export const GET_USERDATA_SUCCESS = createAction("GET_PERSONAL_DATA_USER_SUCCESS");

// TODO: This actions seems to be a NO-OP? It is dispatched by the requestAllPersonalData saga but never consumed.
export const getAllUserdata = createAction("GET_ALL_USERDATA");

export const GET_ALL_USERDATA_FAIL = createAction<{ message: string }>("GET_PERSONAL_DATA_ALL_USER_DATA_FAIL");

export const postUserdata = createAction<PersonalDataData>("postUserdata");

// Fake an error response from the backend. The action ending in _FAIL ought to mean the notification
// middleware picks this error up and shows something to the user.
export const getAllUserdataFail = createAction(
  "GET_PERSONAL_DATA_ALL_USER_DATA_FAIL",
  function prepare(message: string) {
    return {
      error: true,
      payload: {
        message,
      },
    };
  }
);

// Fake an error response from the backend. The action ending in _FAIL ought to mean the notification
// middleware picks this error up and shows something to the user.
export const postUserdataFail = createAction("POST_PERSONAL_DATA_USER_FAIL", function prepare(message: string) {
  return {
    error: true,
    payload: {
      message,
    },
  };
});
