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
    let messages =
      state.intl.locale === "en"
        ? state.intl.messages.en
        : state.intl.locale === "sv"
        ? state.intl.messages
        : null;

    // if intl.locale set to en
    // state.intl.messages contains en: {ids and strings}, sv: {ids and strings}

    // if intl.locale set to sv
    // state.intl.messages contains {sv ids and strings}

    // if language set to other
    // state.intl.messages contains (?)

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
