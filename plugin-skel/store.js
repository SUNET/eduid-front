import { combineReducers } from "redux";
import { intlReducer } from "react-intl-redux";
import { routerReducer } from "react-router-redux";

import actionMainReducer from "reducers/ActionMain";
import notificationsReducer from "reducers/Notifications";

import * as actions from "actions/ActionMain";

// see the config params in eduid-developer/etcd/conf.yaml
const actionData = {
  // central state particular for this plugin, kept under state.plugin
};

export const actionReducer = (state = actionData, action) => {
  switch (action.type) {
    // modify the central state according to the particular actions defined in
    // this plugin.
    default:
      return state;
  }
};

const App = combineReducers({
  router: routerReducer,
  intl: intlReducer,
  main: actionMainReducer,
  plugin: actionReducer,
  notifications: notificationsReducer
});

export default App;
