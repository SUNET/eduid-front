import initStore from "./initStore";
import { getConfig } from "./init_actions";
import { saveLinkCode } from "./../redux/actions/postResetPasswordActions";
import { addLoginRef } from "./../redux/actions/addDataToStoreActions";
import { addTouVersions } from "./../redux/actions/addDataToStoreActions";

const init_container = () => {
  console.log("Initializing state for the login app...");
  initStore.dispatch(getConfig());

  // check url for code
  const url = document.location.href;
  const urlCode = url.split("/").reverse()[0];
  if (url.includes(`/login/`)) {
    initStore.dispatch(addLoginRef(urlCode));
    // extract the available tou versions in the message object
    const state = initStore.getState();
    const messages = state.intl.messages.en;
    const touVersions = Object.keys(messages)
      .filter((msgId) => msgId.includes("login.tou.version."))
      .map((mgsId) => mgsId.split(".").reverse()[0]);
    initStore.dispatch(addTouVersions(touVersions));
  }

  if (url.includes(`/email-code/`)) {
    // pass on code get config for app and
    initStore.dispatch(saveLinkCode(urlCode));
  }
};

export default init_container;
