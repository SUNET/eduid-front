import { takeLatest } from "redux-saga/effects";

import * as init_actions from "../app_init/init_actions";
import { requestLoginConfig } from "../app_init/init_sagas";

import * as login_actions from "../components/LoginApp/LoginForm/LoginForm_actions";
import { postEmail } from "../components/LoginApp/LoginForm/LoginForm_sagas";

// import * as resetting_actions from "login/components/Resetting/Resetting_actions";
// import { getConfigFromCode } from "login/components/Resetting/Resetting_sagas";

function* rootSaga() {
  yield [
    takeLatest(init_actions.GET_LOGIN_CONFIG, requestLoginConfig),
    takeLatest(login_actions.ADD_EMAIL, postEmail)
    // takeLatest(resetting_actions.CODE_FOR_CONFIG, getConfigFromCode),
  ];
}

export default rootSaga;
