import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import ResetPasswordMain from "./ResetPasswordMain";
import EmailLinkSent from "./EmailLinkSent";
import ExtraSecurity from "./ExtraSecurity";
import PhoneCodeSent from "./PhoneCodeSent";
import SetNewPassword from "./SetNewPassword";
import ResetPasswordSuccess from "./ResetPasswordSuccess";

function ResetPassword(): JSX.Element {
  return (
    <Switch>
      <Route exact path="/reset-password/" component={() => <Redirect to="/reset-password/email" />} />
      <Route path={`/reset-password/email`} component={ResetPasswordMain} />
      <Route exact path="/reset-password/email-link-sent" component={EmailLinkSent} />
      <Route path="/reset-password/extra-security" render={(props) => <ExtraSecurity {...props} />} />
      <Route path="/reset-password/phone-code-sent" component={PhoneCodeSent} />
      <Route exact path="/reset-password/success" component={ResetPasswordSuccess} />
      <Route path="/reset-password/set-new-password" component={SetNewPassword} />
    </Switch>
  );
}

export default ResetPassword;
