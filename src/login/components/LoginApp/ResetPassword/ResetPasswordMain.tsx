import { useActor } from "@xstate/react";
import { verifyEmailLink } from "apis/eduidResetPassword";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import React, { useCallback, useContext, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { HandleExtraSecurities } from "./HandleExtraSecurities";
import { PhoneCodeSent } from "./PhoneCodeSent";
import { ResetPasswordApp } from "./ResetPasswordApp";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";
import { SelectedSecurityToken } from "./SelectedSecurityToken";
import { ResetPasswordSuccess, SetNewPassword } from "./SetNewPassword";

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
        <Routes>
          <Route path="email-code/:emailCode" element={<HandleEmailCode />} />
          <Route path="" element={<ResetPasswordApp />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

// URL parameters passed to this component
interface CodeParams {
  emailCode?: string;
}

export function HandleEmailCode(): JSX.Element {
  const isLoaded = useAppSelector((state) => state.config.is_configured);
  const email_code = useAppSelector((state) => state.resetPassword.email_code);
  const params = useParams() as CodeParams;
  const codeParams = params.emailCode;
  const dispatch = useAppDispatch();
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const [state] = useActor(resetPasswordContext.resetPasswordService);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      if (email_code) {
        return;
      } else if (codeParams) {
        verifyResetPasswordEmailLink(codeParams).catch(console.error);
      } // if user reload the page, user will be redirected to the reset password first page
      else if (state.value === "ResetPasswordApp") {
        navigate("/reset-password");
      }
    }
  }, [isLoaded, email_code]);

  const verifyResetPasswordEmailLink = useCallback(async (email_code: string) => {
    const response = await dispatch(verifyEmailLink({ email_code: email_code }));
    if (verifyEmailLink.fulfilled.match(response)) {
      if (response.payload.extra_security && Object.values(response.payload.extra_security).length) {
        resetPasswordContext.resetPasswordService.send({ type: "CAN_DO_EXTRA_SECURITY" });
      } else {
        resetPasswordContext.resetPasswordService.send({ type: "WITHOUT_EXTRA_SECURITY" });
      }
    } else navigate("/reset-password");
  }, []);

  return (
    <React.Fragment>
      {state.matches("HandleExtraSecurities.HandleExtraSecurities") && <HandleExtraSecurities />}
      {state.matches("HandleExtraSecurities.ResetPasswordSecurityKey") && <SelectedSecurityToken />}
      {state.matches("HandleExtraSecurities.ResetPasswordPhoneVerification") && <PhoneCodeSent />}
      {state.matches("FinaliseResetPassword.SetNewPassword") && <SetNewPassword />}
      {state.matches("FinaliseResetPassword.ResetPasswordSuccess") && <ResetPasswordSuccess />}
    </React.Fragment>
  );
}
