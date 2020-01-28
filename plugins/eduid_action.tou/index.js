import './public-path';
try {
  require("entry-points/plugin-common");
} catch (error) {
  console.log("Problem loading polyfills, ", error);
}

import React from "react";

import init_plugin from "init-plugin";
import * as actions from "actions/ActionWrapper";
import MainContainer from "./component";
import App from "./store";
import rootSaga from "./root-saga";

init_plugin(
  App,
  rootSaga,
  document.getElementById("root"),
  <MainContainer />,
  actions.getConfig()
);
