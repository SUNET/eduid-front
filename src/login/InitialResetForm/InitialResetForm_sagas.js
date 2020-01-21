import { put, select, call } from "redux-saga/effects";
import * as util from "sagas/common";
import * as actions from "login/InitialResetForm/InitialResetForm_actions";


export function sendEmailRequest(config, data) {
  return window
    .fetch(config.password_service_url + "reset/", {
      ...util.postRequest,
      body: JSON.stringify(data)
    })
    .then(util.checkStatus)
    .then(response => response.json());
}

const getData = state => ({
  email: state.reset.email,
  csrf_token: state.config.csrf_token
});

export const initReset = util.saveData(
  getData,
  "init-reset-form",
  data => ({ type: "NOOP_ACTION" }),
  sendEmailRequest,
  actions.postEmailFail
);
