import initStore from "./initStore";
import { getConfig } from "./init_actions";
import resetPasswordSlice from "../redux/slices/resetPasswordSlice";

const init_container = () => {
  console.log("Initializing state for the login app...");
  initStore.dispatch(getConfig());

  const url = document.location.href;

  if (url.includes(`/email-code/`) || url.includes(`/extra-security/`)) {
    // pass on code get config for app and
    const urlCode = url.split("/").reverse()[0];
    initStore.dispatch(resetPasswordSlice.actions.saveLinkCode(urlCode));
  }
};

export default init_container;
