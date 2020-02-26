import {
  checkStatus,
  postRequest,
  saveData
} from "../../../../../sagas/common";
import * as actions from "./EmailLinkSent_actions";
import * as app_actions from "../../../App/App_actions";

export function postEmailLinkRequest(config, data) {
  return window
    .fetch(PASSWORD_SERVICE_URL + "/reset/config/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

const getData = state => ({
  code: document.location.href.split("/").reverse()[0],
  csrf_token: state.config.csrf_token
});

export const postEmailLinkCode = saveData(
  getData,
  "config-reset-form",
  app_actions.appLoaded,
  postEmailLinkRequest,
  actions.postEmailLinkFail
);
