import initStore from "./initStore";
import * as actions from "../components/App/App_actions";

// to follow the naming of the compnetents this is really init_container

// init_actions are listed in App_actions, but maybe should be here?
/* Initial action */
const initAction = () => {
  console.log("Initializing state for the login app...");
  // get the config for app
  initStore.dispatch(actions.getLoginConfig());
  // load app once config is in
  initStore.dispatch(actions.appLoaded());
};

export default initAction;
