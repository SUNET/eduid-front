
import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux'
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import mainReducer from 'reducers/Main';

const eduIDApp = combineReducers({
    main: mainReducer,
    router: routerReducer,
    form: formReducer,
    intl: intlReducer
});

export default eduIDApp;
