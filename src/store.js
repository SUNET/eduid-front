
import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux'
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import captchaReducer from 'reducers/Captcha';
import mainReducer from 'reducers/Main';
import emailReducer from 'reducers/Email';
import notificationsReducer from 'reducers/Notifications';

const eduIDApp = combineReducers({
    main: mainReducer,
    email: emailReducer,
    captcha: captchaReducer,
    router: routerReducer,
    form: formReducer,
    intl: intlReducer,
    notifications: notificationsReducer
});

export default eduIDApp;
