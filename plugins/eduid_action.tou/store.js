
import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux'
import { routerReducer } from 'react-router-redux';

import actionWrapperReducer from 'reducers/ActionWrapper';
import notificationsReducer from 'reducers/Notifications';

import * as actions from "actions/ActionWrapper";

// see the config params in eduid-developer/etcd/conf.yaml
const actionData = {
    tous: {},
    version: ''
};

export const actionReducer = (state=actionData, action) => {
  switch (action.type) {
    case actions.GET_ACTIONS_CONFIG_SUCCESS:
      return {
          ...state,
          ...action.payload
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

