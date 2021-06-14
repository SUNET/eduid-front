import initStore from "./initStore";
import { getConfig } from "./init_actions";
import { saveLinkCode } from "./../redux/actions/postResetPasswordActions";
import { addLoginRef } from "./../redux/actions/addDataToStoreActions";

const init_container = () => {
  console.log("Initializing state for the login app...");
  initStore.dispatch(getConfig());

  // check url for code
  const url = document.location.href;
  const urlCode = url.split("/").reverse()[0];
  if (url.includes(`/login/`)) {
    initStore.dispatch(addLoginRef(urlCode));
  }

  if (url.includes(`/email-code/`)) {
    // pass on code get config for app and
    initStore.dispatch(saveLinkCode(urlCode));
  }
};

export default init_container;