// create middleware
import createSagaMiddleware from "redux-saga";
import notifyAndDispatch from "../../notify-middleware";
import { routerMiddleware } from "react-router-redux";
import { history } from "../components/App/App";

// import all sagas to add to store
import rootSaga from "../app_config/login-rootSaga";
import { configureStore } from "@reduxjs/toolkit";
import initReducer from "./init_reducer";
import notificationsReducer from "../components/Notifications/Notifications_reducer";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { intlReducer } from "react-intl-redux";
import appReducer from "../components/App/App_reducer";
import loginSlice from "../redux/slices/loginSlice";
import resetPasswordSlice from "../redux/slices/resetPasswordSlice";
import logger from "redux-logger";

/* setup to run the combined sagas */
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger, notifyAndDispatch, routerMiddleware(history)];

const initStore = configureStore({
  reducer: {
    config: initReducer,
    app: appReducer,
    login: loginSlice.reducer,
    notifications: notificationsReducer,
    router: routerReducer,
    form: formReducer,
    intl: intlReducer,
    resetPassword: resetPasswordSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), ...middlewares],
  devTools: process.env.NODE_ENV !== 'production',
})

sagaMiddleware.run(rootSaga);

export default initStore;
