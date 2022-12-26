import { verifyEmailLink } from "apis/eduidResetPassword";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import React, { useContext, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { ResetPasswordGlobalStateContext, ResetPasswordGlobalStateProvider } from "./ResetPasswordGlobalState";
import { ResetPasswordRequestEmail } from "./ResetPasswordRequestEmail";

export default function ResetPassword(): JSX.Element {
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
            {/* <Route path="extra-security" element={<ExtraSecurity />} />
            <Route path="phone-code-sent" element={<PhoneCodeSent />} />
            <Route path="success" element={<ResetPasswordSuccess />} />
            <Route path="set-new-password" element={<SetNewPassword />} />*/}
            <Route path="email-code/:emailCode" element={<EmailCode />} />
            <Route path=":ref" element={<ResetPasswordRequestEmail />} />
            <Route path="" element={<ResetPasswordRequestEmail />} />
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

export function EmailCode(): JSX.Element | null {
  const isLoaded = useAppSelector((state) => state.config.is_configured);
  const params = useParams() as CodeParams;
  const email_code = params.emailCode;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  useEffect(() => {
    if (isLoaded && email_code) {
      verifyResetPasswordEmailLink(email_code);
    }
  }, [isLoaded]);

  resetPasswordContext.resetPasswordService.send({ type: "COMPLETE" });

  async function verifyResetPasswordEmailLink(email_code: string) {
    const response = await dispatch(verifyEmailLink({ email_code: email_code }));
    if (verifyEmailLink.fulfilled.match(response)) {
      // if (Object.values(response.payload.extra_security).length > 0) {
      // navigate("/reset-password/extra-security");
      resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
    } else {
      //  dispatch(resetPasswordSlice.actions.selectExtraSecurity("without"));
      // navigate("/reset-password/set-new-password");
      resetPasswordContext.resetPasswordService.send({ type: "API_FAIL" });
      // }
    }
    // resetPasswordContext.resetPasswordService.send({ type: "API_FAIL" });
    // else navigate("/reset-password");
  }
  return null;
}
