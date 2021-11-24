// create middleware
import createSagaMiddleware from "redux-saga";
import notifyAndDispatch from "../../notify-middleware";
import { routerMiddleware } from "react-router-redux";
import { history } from "../components/App/App";

// import all sagas to add to store
import rootSaga from "../app_config/login-rootSaga";
import { configureStore, Reducer } from "@reduxjs/toolkit";
import initReducer from "./init_reducer";
import notificationsReducer from "../components/Notifications/Notifications_reducer";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import appReducer from "../components/App/App_reducer";
import loginSlice from "../redux/slices/loginSlice";
import resetPasswordSlice from "../redux/slices/resetPasswordSlice";
import logger from "redux-logger";
import intlSlice from "../../reducers/Internationalisation";

/* setup to run the combined sagas */
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger, notifyAndDispatch, routerMiddleware(history)];

// TODO: Type the notificationsReducer instead of defining a type here
type NotificationStateType = {
  messages: unknown[];
  errors: unknown[];
};

const initStore = configureStore({
  reducer: {
    config: initReducer,
    app: appReducer,
    login: loginSlice.reducer,
    notifications: notificationsReducer as Reducer<NotificationStateType>,
    router: routerReducer,
    form: formReducer,
    intl: intlSlice.reducer,
    resetPassword: resetPasswordSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});
sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type LoginRootState = ReturnType<typeof initStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type LoginAppDispatch = typeof initStore.dispatch;

export default initStore;
