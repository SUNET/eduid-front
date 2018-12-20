
import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux'
import { routerReducer } from 'react-router-redux';

import actionWrapperReducer from 'reducers/ActionWrapper';
import notificationsReducer from 'reducers/Notifications';

import * as actions from "actions/ActionWrapper";
import { U2FDATA_SIGNED } from "./component";

// see the config params in eduid-developer/etcd/conf.yaml
const actionData = {
    token_response: {}
};

export const actionReducer = (state=actionData, action) => {
  switch (action.type) {
    case U2FDATA_SIGNED:
      return {
          ...state,
          token_response: action.payload.data
      };
    default:
      return state;
  }
};


const App = combineReducers({
    router: routerReducer,
    intl: intlReducer,
    config: actionWrapperReducer,
    plugin: actionReducer,
    notifications: notificationsReducer
});

export default App;
