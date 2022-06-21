import React, { useEffect } from "react";
import { Route, Redirect, Switch, useHistory, useParams } from "react-router-dom";
import ResetPasswordMain from "./ResetPasswordMain";
import EmailLinkSent from "./EmailLinkSent";
import ExtraSecurity from "./ExtraSecurity";
import PhoneCodeSent from "./PhoneCodeSent";
import SetNewPassword from "./SetNewPassword";
import ResetPasswordSuccess from "./ResetPasswordSuccess";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";

function ResetPassword(): JSX.Element {
  const dispatch = useAppDispatch();
  const goto_url = useAppSelector((state) => state.resetPassword.goto_url);
  const history = useHistory();

  useEffect(() => {
    if (goto_url) {
      // a saga is requesting us to send the user off to some URL
      dispatch(resetPasswordSlice.actions.setGotoUrl(undefined));
      history.push(goto_url);
    }
  }, [goto_url]);

  return (
    <Switch>
      <Route exact path="/reset-password/" component={() => <Redirect to="/reset-password/email" />} />
      <Route path={`/reset-password/email`} component={ResetPasswordMain} />
      <Route path={`/reset-password/email-code/:emailCode`} component={EmailCode} />
      <Route exact path="/reset-password/email-link-sent" component={EmailLinkSent} />
      <Route path="/reset-password/extra-security" component={ExtraSecurity} />
      <Route path="/reset-password/phone-code-sent" component={PhoneCodeSent} />
      <Route exact path="/reset-password/success" component={ResetPasswordSuccess} />
      <Route path="/reset-password/set-new-password" component={SetNewPassword} />
    </Switch>
  );
}

// URL parameters passed to this component
interface CodeParams {
  emailCode?: string;
}

function EmailCode(): JSX.Element | null {
  const isLoaded = useAppSelector((state) => state.config.is_configured);
  const params = useParams() as CodeParams;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoaded && params.emailCode) {
      // save and use the code once the app is configured
      dispatch(resetPasswordSlice.actions.saveLinkCode(params.emailCode));
      dispatch(resetPasswordSlice.actions.useLinkCode());
    }
  }, [isLoaded]);

  return null;
}

export default ResetPassword;
