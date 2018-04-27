
import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux'
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

const eduIDApp = combineReducers({
  router: routerReducer,
  form: formReducer,
  intl: intlReducer
});

export default eduIDApp;
