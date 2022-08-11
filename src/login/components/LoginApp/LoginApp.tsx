import { Switch } from "react-router-dom";
import { CompatRoute as Route } from "react-router-dom-v5-compat";
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
        <Route path="/reset-password/" component={ResetPassword} />
      </Switch>
    </div>
  );
}

export default LoginApp;
