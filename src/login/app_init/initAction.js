import initStore from "./initStore";
import * as actions from "../components/App/App_actions";

/* Initial action */
const initAction = () => {
  console.log("Initializing state for the login app...");
  // get the config for app
  initStore.dispatch(actions.getLoginConfig());
  // load app once config is in
  initStore.dispatch(actions.appLoaded());
};

export default initAction;
