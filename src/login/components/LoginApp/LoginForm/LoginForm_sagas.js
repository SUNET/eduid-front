// import { put, select, call } from "redux-saga/effects";
import { postRequest, checkStatus, saveData } from "../../../../sagas/common";
import * as actions from "./LoginForm_actions";


export function postLoginRequest(init, data) {
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
  // password: state.login.password,
  csrf_token: state.config.csrf_token
});

export const postLoginDetails = saveData(
  getData,
  "login-form",
  () => ({ type: "NOOP_ACTION" }),
  postLoginRequest,
  actions.saveLoginFail
);
