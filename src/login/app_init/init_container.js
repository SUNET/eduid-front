import initStore from "./initStore";
import * as init_actions from "./init_actions";
import * as emailLinkSent_actions from "../components/LoginApp/ResetPassword/EmailLinkSent/EmailLinkSent_actions";
// import * as app_actions from "../components/App/App_actions";

const init_container = () => {
  console.log("Initializing state for the login app...");
  const url = document.location.href.split("/").reverse();
  console.log("url:", url);
  if (url[1] === "code") {
    // get config for app when staring from an email link
    initStore.dispatch(emailLinkSent_actions.useEmailLinkCode(url[0]));
  } else {
    // get config for app
    initStore.dispatch(init_actions.getLoginConfig());
  }
};

export default init_container;
