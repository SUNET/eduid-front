import { useActor } from "@xstate/react";
import { verifyEmailLink } from "apis/eduidResetPassword";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import React, { useContext, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Route, Routes, useParams } from "react-router-dom";
import { ExtraSecurityToken } from "./ExtraSecurityToken";
import { HandleExtraSecurities, ProcessExtraSecurities } from "./HandleExtraSecurities";
import { PhoneCodeSent } from "./PhoneCodeSent";
import { ResetPasswordApp } from "./ResetPasswordApp";
import { ResetPasswordGlobalStateContext, ResetPasswordGlobalStateProvider } from "./ResetPasswordGlobalState";
import { ResetPasswordSuccess } from "./ResetPasswordSuccess";
import { SetNewPassword } from "./SetNewPassword";

export default function ResetPasswordMain(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Reset Password",
      defaultMessage: "Reset Password | eduID",
    });
  }, []);

  return (
    <React.Fragment>
      <h1>
        <FormattedMessage defaultMessage="Reset password" description="Reset Password heading" />
      </h1>
      <hr className="border-line" />
      <div id="reset-pass-display">
        <ResetPasswordGlobalStateProvider>
          <Routes>
            <Route path="email-code/:emailCode" element={<EmailCode />} />
            <Route path="" element={<ResetPasswordApp />} />
          </Routes>
        </ResetPasswordGlobalStateProvider>
      </div>
    </React.Fragment>
  );
}

// URL parameters passed to this component
interface CodeParams {
  emailCode?: string;
}

export function EmailCode(): JSX.Element {
  const isLoaded = useAppSelector((state) => state.config.is_configured);
  const params = useParams() as CodeParams;
  const email_code = params.emailCode;
  const dispatch = useAppDispatch();
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const [state] = useActor(resetPasswordContext.resetPasswordService);

  useEffect(() => {
    if (isLoaded && email_code) {
      verifyResetPasswordEmailLink(email_code);
    }
  }, [isLoaded]);
  console.log(state.value);

  async function verifyResetPasswordEmailLink(email_code: string) {
    const response = await dispatch(verifyEmailLink({ email_code: email_code }));
    if (verifyEmailLink.fulfilled.match(response)) {
      resetPasswordContext.resetPasswordService.send({ type: "BYPASS" });
    } else resetPasswordContext.resetPasswordService.send({ type: "API_FAIL" });
  }
  return (
    <React.Fragment>
      {state.matches("HandleExtraSecurities.HandleExtraSecurities") && <HandleExtraSecurities />}
      {state.matches("HandleExtraSecurities.ProcessExtraSecurities") && <ProcessExtraSecurities />}
      {state.matches("HandleExtraSecurities.ResetPasswordSecurityKey") && <ExtraSecurityToken />}
      {state.matches("HandleExtraSecurities.ResetPasswordPhoneVerification") && <PhoneCodeSent />}
      {state.matches("FinaliseResetPassword.SetNewPassword") && <SetNewPassword />}
      {state.matches("FinaliseResetPassword.ResetPasswordSuccess") && <ResetPasswordSuccess />}
    </React.Fragment>
  );
}
