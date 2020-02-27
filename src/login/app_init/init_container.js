import initStore from "./initStore";
import * as init_actions from "./init_actions";
// import * as emailLinkSent_actions from "../components/LoginApp/ResetPassword/EmailLinkSent/EmailLinkSent_actions";
// import * as app_actions from "../components/App/App_actions";

// window.URLSearchParams = require("url-search-params");

const init_container = () => {
  console.log("Initializing state for the login app...");
  const url = window.location.href.split("/").reverse();
  console.log("url:", url);
  console.log("url[0]:", url[0]);
  if (url[0].includes("email_code")) {
    // get config for app when staring from an email link
    initStore.dispatch(init_actions.uselLinkCode(url[0]));
  } else {
    // get config for app
    initStore.dispatch(init_actions.getConfig());
  }
};

export default init_container;
