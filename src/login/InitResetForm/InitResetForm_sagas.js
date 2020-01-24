import { put, select, call } from "redux-saga/effects";
import { postRequest, checkStatus, saveData } from "sagas/common";
import * as actions from "login/InitResetForm/InitResetForm_actions";


export function sendEmailRequest(config, data) {
  return window
    .fetch(config.password_service_url + "reset/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

const getData = state => ({
  email: state.reset.email,
  csrf_token: state.config.csrf_token
});

export const initReset = saveData(
  getData,
  "init-reset-form",
  data => ({ type: "NOOP_ACTION" }),
  sendEmailRequest,
  actions.postEmailFail
);
