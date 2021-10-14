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
    const messages = state.intl.messages;
    const touVersions = Object.keys(messages)
      .filter((msgId) => msgId.includes("login.tou.version."))
      .map((mgsId) => mgsId.split(".").reverse()[0]);
    initStore.dispatch(addTouVersions(touVersions));
    // REMOVE: after actions/plugins are removed
    if (url.includes(`mfa`)) {
      // ignores information after `?` in all urls
      if (url.includes(`?`)) {
        const mfaPageUrl = `${window.location.origin}${window.location.pathname}`;
        window.location = mfaPageUrl;
      }
    }
  }

  if (url.includes(`/email/`)) {
    initStore.dispatch(addLoginRef(urlCode));
  } else if (url.includes(`/email-code/`) || url.includes(`/extra-security/`)) {
    // pass on code get config for app and
    initStore.dispatch(saveLinkCode(urlCode));
  }
};

export default init_container;
