import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Route, Switch, useHistory, useParams } from "react-router-dom";
import ExtraSecurity from "./ExtraSecurity";
import PhoneCodeSent from "./PhoneCodeSent";
import { ResetPasswordRequestEmail } from "./ResetPasswordRequestEmail";
import ResetPasswordSuccess from "./ResetPasswordSuccess";
import SetNewPassword from "./SetNewPassword";

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
    <React.Fragment>
      <h1>
        <FormattedMessage defaultMessage="Reset password" description="Reset Password heading" />
      </h1>
      <div className="lead"></div>
      <div id="reset-pass-display">
        <Switch>
          <Route path="/reset-password/extra-security" component={ExtraSecurity} />
          <Route path="/reset-password/phone-code-sent" component={PhoneCodeSent} />
          <Route exact path="/reset-password/success" component={ResetPasswordSuccess} />
          <Route path="/reset-password/set-new-password" component={SetNewPassword} />
          <Route path="/reset-password/email-code/:emailCode" component={EmailCode} />
          <Route path="/reset-password/:ref" component={ResetPasswordRequestEmail} />
          <Route path="/reset-password/" component={ResetPasswordRequestEmail} />
        </Switch>
      </div>
    </React.Fragment>
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
