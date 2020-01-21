import { put, call } from "redux-saga/effects";
import { ajaxHeaders, checkStatus, getRequest } from "sagas/common";

import * as actions from "login/ResetpwCode/ResetpwCode_actions";

import { put, select, call } from "redux-saga/effects";
import * as util from "sagas/common";
import * as actions from "login/InitialResetForm/InitialResetForm_actions";


export function requestConfigFromCode(config, data) {
  return window
    .fetch(config.password_service_url + "reset/config", {
      ...util.postRequest,
      body: JSON.stringify(data)
    })
    .then(util.checkStatus)
    .then(response => response.json());
}

const getData = state => ({
  code: document.location.href.split('/').reverse()[0],
  csrf_token: state.config.csrf_token
});

export const configReset = util.saveData(
  getData,
  "config-reset-form",
  data => ({ type: "NOOP_ACTION" }),
  requestConfigFromCode,
  actions.postCodeFail
);
