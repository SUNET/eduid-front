import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./Login/Login";
import ResetPasswordMain from "./ResetPassword/ResetPasswordMain";
import EmailLinkSent from "./ResetPassword/EmailLinkSent";
import ExtraSecurity from "./ResetPassword/ExtraSecurity";
import PhoneCodeSent from "./ResetPassword/PhoneCodeSent";
import SetNewPassword from "./ResetPassword/SetNewPassword";
import ResetPasswordSuccess from "./ResetPassword/ResetPasswordSuccess";
import UseOtherDevice2 from "./Login/UseOtherDevice2";

function LoginApp(): JSX.Element {
  return (
    <div id="content" className="horizontal-content-margin">
      <Switch>
        <Route exact path={`/login/other/:state_id`} component={UseOtherDevice2} />
        <Route exact path={`/login/password/:ref`} component={Login} />
        <Route exact path={`/login/:ref`} component={Login} />
        <Route exact path="/reset-password/" component={() => <Redirect to="/reset-password/email" />} />
        <Route path={`/reset-password/email`} component={ResetPasswordMain} />
        <Route exact path="/reset-password/email-link-sent" component={EmailLinkSent} />
        <Route path="/reset-password/extra-security" render={(props) => <ExtraSecurity {...props} />} />
        <Route path="/reset-password/phone-code-sent" component={PhoneCodeSent} />
        <Route exact path="/reset-password/success" component={ResetPasswordSuccess} />
        <Route path="/reset-password/set-new-password" component={SetNewPassword} />
      </Switch>
    </div>
  );
}

export default LoginApp;
