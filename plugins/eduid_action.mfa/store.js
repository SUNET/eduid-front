import { combineReducers } from "redux";
import { intlReducer } from "react-intl-redux";
import { routerReducer } from "react-router-redux";

import actionMainReducer from "reducers/ActionMain";
import notificationsReducer from "reducers/Notifications";

import * as actions from "actions/ActionMain";
import { WEBAUTHN_CREDS_GOT } from "./component";

// see the config params in eduid-developer/etcd/conf.yaml
const actionData = {
  webauthn_assertion: null
};

export const actionReducer = (state = actionData, action) => {
  switch (action.type) {
    case WEBAUTHN_CREDS_GOT:
      return {
        ...state,
        webauthn_assertion: action.payload
      };
    default:
      return state;
  }
};

const App = combineReducers({
  router: routerReducer,
  intl: intlReducer,
  config: actionMainReducer,
  plugin: actionReducer,
  notifications: notificationsReducer
});

export default App;
