import initStore from "./initStore";
import * as init_actions from "./init_actions";
import * as app_actions from "../components/App/App_actions";
/* Initial action */
const init_container = () => {
  console.log("Initializing state for the login app...");
  // get the config for app
  initStore.dispatch(init_actions.getLoginConfig());
  // // load app once config is in
  // initStore.dispatch(app_actions.appLoaded());
};

export default init_container;
