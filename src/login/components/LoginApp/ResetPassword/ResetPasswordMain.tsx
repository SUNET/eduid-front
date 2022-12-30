import { useActor } from "@xstate/react";
import { verifyEmailLink } from "apis/eduidResetPassword";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import React, { useContext, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { ExtraSecurityToken } from "./ExtraSecurityToken";
import { HandleExtraSecurities, ProcessExtraSecurities } from "./HandleExtraSecurities";
import { ResetPasswordApp } from "./ResetPasswordApp";
import { ResetPasswordGlobalStateContext, ResetPasswordGlobalStateProvider } from "./ResetPasswordGlobalState";

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
            {/* <Route path="extra-security" element={<ProcessExtraSecurities />} /> */}
            {/*<Route path="phone-code-sent" element={<PhoneCodeSent />} />
            <Route path="success" element={<ResetPasswordSuccess />} />
            <Route path="set-new-password" element={<SetNewPassword />} />*/}
            <Route path="email-code/:emailCode" element={<EmailCode />} />
            {/* <Route path=":ref" element={<ResetPasswordRequestEmail />} /> */}
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
  const navigate = useNavigate();
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const [state] = useActor(resetPasswordContext.resetPasswordService);

  useEffect(() => {
    if (isLoaded && email_code) {
      verifyResetPasswordEmailLink(email_code);
    }
  }, [isLoaded]);
  console.log(state.value);
  // resetPasswordContext.resetPasswordService.send({ type: "COMPLETE" });

  async function verifyResetPasswordEmailLink(email_code: string) {
    const response = await dispatch(verifyEmailLink({ email_code: email_code }));
    if (verifyEmailLink.fulfilled.match(response))
      // if (Object.values(response.payload.extra_security).length > 0) {
      // navigate("/reset-password/extra-security");
      // console.log("API_SUCCESS");
      resetPasswordContext.resetPasswordService.send({ type: "BYPASS" });
    // } else {
    //  dispatch(resetPasswordSlice.actions.selectExtraSecurity("without"));
    // navigate("/reset-password/set-new-password");
    // resetPasswordContext.resetPasswordService.send({ type: "API_FAIL" });
    // }
    // }
    // resetPasswordContext.resetPasswordService.send({ type: "API_FAIL" });
    // else navigate("/reset-password");
    // navigate("/reset-password/extra-security");
  }
  return (
    <React.Fragment>
      {state.matches("HandleExtraSecurities.HandleExtraSecurities") && <HandleExtraSecurities />}
      {state.matches("HandleExtraSecurities.ProcessExtraSecurities") && <ProcessExtraSecurities />}
      {state.matches("HandleExtraSecurities.ResetPasswordSecurityKey") && <ExtraSecurityToken />}
      {/* {state.matches("HandleExtraSecurities.ResetPasswordPhoneVerification") && <PhoneCodeSent />} */}
      {/* TODO:make a new component for this */}
      {/* {state.matches("HandleExtraSecurities.ResetPasswordFrejaEID") && null} */}
      {/* {state.matches("FinaliseResetPassword.SetNewPassword") && <SetNewPassword />}
      {state.matches("FinaliseResetPassword.ResetPasswordSuccess") && <ResetPasswordSuccess />} */}
    </React.Fragment>
  );
}
