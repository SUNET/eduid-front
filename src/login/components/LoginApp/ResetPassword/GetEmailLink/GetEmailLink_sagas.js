import {
  checkStatus,
  postRequest,
  saveData
} from "../../../../../sagas/common";
import * as actions from "./GetEmailLink_actions";

export function postEmailRequest(init, data) {
  return window
    .fetch(PASSWORD_SERVICE_URL + "/reset/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

const getData = state => ({
  email: state.getEmailLink.email,
  csrf_token: state.config.csrf_token
});

export const postEmail = saveData(
  getData,
  "email-form",
  data => ({ type: "NOOP_ACTION" }),
  postEmailRequest,
  actions.saveEmailFail
);
