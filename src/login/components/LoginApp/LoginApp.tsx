import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./Login/Login";
import ResetPasswordMain from "./ResetPassword/ResetPasswordMain";
import EmailLinkSent from "./ResetPassword/EmailLinkSent";
import ExtraSecurity from "./ResetPassword/ExtraSecurity";
import PhoneCodeSent from "./ResetPassword/PhoneCodeSent";
import SetNewPassword from "./ResetPassword/SetNewPassword";
import ResetPasswordSuccess from "./ResetPassword/ResetPasswordSuccess";

class LoginApp extends React.Component {
  // run-time type checking in development mode
  static propTypes = {};

  render() {
    return (
      <div id="content" className="horizontal-content-margin">
        <Switch>
          <Route exact path={`/login/password/:ref`} render={(props) => <Login {...props} />} />
          <Route exact path={`/login/:ref`} render={(props) => <Login {...props} />} />
          <Route exact path="/reset-password/" component={() => <Redirect to="/reset-password/email" />} />
          <Route path={`/reset-password/email`} component={ResetPasswordMain} />
          <Route exact path="/reset-password/email-link-sent" component={EmailLinkSent} />
          <Route path="/reset-password/extra-security" render={(props) => <ExtraSecurity {...props} />} />
          <Route path="/reset-password/phone-code-sent" component={PhoneCodeSent} />
          <Route path="/reset-password/set-new-password" render={(props) => <SetNewPassword {...props} />} />
          <Route exact path="/reset-password/success" component={ResetPasswordSuccess} />
        </Switch>
      </div>
    );
  }
}

export default LoginApp;
