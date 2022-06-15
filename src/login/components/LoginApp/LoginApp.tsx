import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
import UseOtherDevice2 from "./Login/UseOtherDevice2";
import ResetPassword from "./ResetPassword/ResetPassword";

function LoginApp(): JSX.Element {
  return (
    <div id="content" className="horizontal-content-margin content">
      <Switch>
        <Route exact path={`/login/other/:state_id`} component={UseOtherDevice2} />
        <Route exact path={`/login/password/:ref`} component={Login} />
        <Route exact path={`/login/:ref`} component={Login} />
        <Route exact path="/reset-password/" component={ResetPassword} />
      </Switch>
    </div>
  );
}

export default LoginApp;
