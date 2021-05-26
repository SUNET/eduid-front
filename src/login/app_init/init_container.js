import initStore from "./initStore";
import * as init_actions from "./init_actions";
import { useLinkCode }  from "./../redux/actions/postResetPasswordActions";

const init_container = () => {
  console.log("Initializing state for the login app...");
  // Starting app with a link from an email
  const url = document.location.href.split("/").reverse();
  const emailCode = url[0].split("=")[1];
  if (url[0].includes("email_code")) {
    // pass on code get config for app and
    initStore.dispatch(useLinkCode(emailCode));
  } else {
    // Starting app without a link from an email
    initStore.dispatch(init_actions.getConfig());
  }
};

export default init_container;
