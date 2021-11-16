import initStore from "./initStore";
import { getConfig } from "./init_actions";
import resetPasswordSlice from "../redux/slices/resetPasswordSlice";
import loginSlice from "../redux/slices/loginSlice";

const init_container = () => {
  console.log("Initializing state for the login app...");
  initStore.dispatch(getConfig());

  const url = document.location.href;
  if (url.includes(`/login/`)) {
    // extract the available tou versions in the message object
    const state = initStore.getState();
    const messages = state.intl.messages;
    const touVersions = Object.keys(messages)
      .filter((msgId) => msgId.includes("login.tou.version."))
      .map((mgsId) => mgsId.split(".").reverse()[0]);
    initStore.dispatch(loginSlice.actions.addTouVersions(touVersions));
  }

  if (url.includes(`/email-code/`) || url.includes(`/extra-security/`)) {
    // pass on code get config for app and
    const urlCode = url.split("/").reverse()[0];
    initStore.dispatch(resetPasswordSlice.actions.saveLinkCode(urlCode));
  }
};

export default init_container;
