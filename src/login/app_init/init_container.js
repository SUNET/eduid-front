import initStore from "./initStore";
import { getConfig } from "./init_actions";
import { useLinkCode } from "./../redux/actions/postResetPasswordActions";

const init_container = () => {
  console.log("Initializing state for the login app...");
  initStore.dispatch(getConfig());

  // check url for code
  const url = document.location.href;
  const urlCode = url.split("/").reverse()[0];
  if (url.includes(`/login/${urlCode}`)) {
    //dispatch code here
  }

  const emailCode = urlCode.split("=")[1];
  if (url.includes("email_code")) {
    // pass on code get config for app and
    initStore.dispatch(useLinkCode(emailCode));
  }
};

export default init_container;
