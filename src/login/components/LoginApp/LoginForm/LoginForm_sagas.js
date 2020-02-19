// import { put, select, call } from "redux-saga/effects";
import { postRequest, checkStatus, saveData } from "../../../../sagas/common";
import * as actions from "./LoginForm_actions";

export function postEmailRequest(init, data) {
  return window
    .fetch(init.password_service_url + "reset/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

const getData = state => ({
  email: state.login.email,
  csrf_token: state.config.csrf_token
});

export const postEmail = saveData(
  getData,
  "login-form",
  data => ({ type: "NOOP_ACTION" }),
  postEmailRequest,
  actions.saveEmailFail
);
