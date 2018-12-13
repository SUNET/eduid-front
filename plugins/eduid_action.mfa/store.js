
import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux'
import { routerReducer } from 'react-router-redux';

import actionWrapperReducer from 'reducers/ActionWrapper';
import notificationsReducer from 'reducers/Notifications';

import * as actions from "actions/ActionWrapper";
import { BEGIN_WEBAUTHN_SUCCESS, BEGIN_WEBAUTHN_FAIL, WEBAUTHN_CREDS_GOT } from "./component";

// see the config params in eduid-developer/etcd/conf.yaml
const actionData = {
    webauthn_ready: false,
    webauthn_options: {},
    webauthn_assertion: {}
};

export const actionReducer = (state=actionData, action) => {
  switch (action.type) {
    case BEGIN_WEBAUTHN_SUCCESS:
      return {
          ...state,
          webauthn_ready: true,
          webauthn_options: action.payload
      };
    case BEGIN_WEBAUTHN_FAIL:
      return {
          ...state,
          webauthn_ready: false
      };
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
    main: actionWrapperReducer,
    plugin: actionReducer,
    notifications: notificationsReducer
});

export default App;
