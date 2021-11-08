// create redux store and add custom middleware to store
import { createStore, applyMiddleware, compose } from "redux";

// create middleware
import createSagaMiddleware from "redux-saga";
import notifyAndDispatch from "../../notify-middleware";
import { routerMiddleware } from "react-router-redux";
import { history } from "../components/App/App";
import { createLogger } from "redux-logger";

// import all the reducers to add to store
import allCombinedReducers from "../app_config/login-rootReducer";
// import all sagas to add to store
import rootSaga from "../app_config/login-rootSaga";

/* for redux dev tools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* setup to run the combined sagas */
const sagaMiddleware = createSagaMiddleware();

const initStore = createStore(
  // this line is configured and updated in login-reducers.js as the app
  allCombinedReducers,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      createLogger(),
      notifyAndDispatch,
      routerMiddleware(history)
    )
  )
);

sagaMiddleware.run(rootSaga);

export default initStore;
