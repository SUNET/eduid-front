import {
  postSetNewPassword,
  postSetNewPasswordExternalMfa,
  postSetNewPasswordExtraSecurityPhone,
  postSetNewPasswordExtraSecurityToken,
} from "apis/eduidResetPassword";
import { CopyToClipboard } from "components/Common/CopyToClipboard";
import { NewPasswordForm, NewPasswordFormData } from "components/Common/NewPasswordForm";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import resetPasswordSlice from "slices/ResetPassword";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

export function SetNewPassword(): JSX.Element | null {
  const suggested_password = useAppSelector((state) => state.resetPassword.suggested_password);
  const extra_security = useAppSelector((state) => state.resetPassword.extra_security);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const selected_option = useAppSelector((state) => state.resetPassword.selected_option);
  const email_code = useAppSelector((state) => state.resetPassword.email_code);
  const phone_code = useAppSelector((state) => state.resetPassword.phone.phone_code);
  const webauthn_assertion = useAppSelector((state) => state.resetPassword.webauthn_assertion);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  useEffect(() => {
    setPassword(suggested_password);
  }, [suggested_password]);

  function goBack() {
    resetPasswordContext.resetPasswordService.send({ type: "GO_BACK" });
    // initialization of state
    dispatch(resetPasswordSlice.actions.resetState());
  }

  async function submitNewPasswordForm(values: NewPasswordFormData) {
    const newPassword = values.newPassword;

    if (!newPassword || !email_code) {
      return;
    }

    dispatch(resetPasswordSlice.actions.storeNewPassword(newPassword));
    if (!selected_option || selected_option === "without") {
      const response = await dispatch(postSetNewPassword({ email_code: email_code, password: newPassword }));
      if (postSetNewPassword.fulfilled.match(response)) {
        resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
      }
    } else if (selected_option === "phoneCode" && phone_code) {
      const response = await dispatch(
        postSetNewPasswordExtraSecurityPhone({ phone_code: phone_code, email_code: email_code, password: newPassword })
      );
      if (postSetNewPasswordExtraSecurityPhone.fulfilled.match(response)) {
        resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
      }
    } else if (selected_option === "securityKey" && webauthn_assertion) {
      const response = await dispatch(
        postSetNewPasswordExtraSecurityToken({
          webauthn_assertion: webauthn_assertion,
          email_code: email_code,
          password: newPassword,
        })
      );
      if (postSetNewPasswordExtraSecurityToken.fulfilled.match(response)) {
        resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
      }
    } else if (selected_option === "swedishEID") {
      const response = await dispatch(
        postSetNewPasswordExternalMfa({
          email_code: email_code,
          password: newPassword,
        })
      );
      if (postSetNewPasswordExternalMfa.fulfilled.match(response)) {
        resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
      }
    }
  }

  if (suggested_password === undefined) {
    return null;
  }

  return (
    <React.Fragment>
      <h2>
        <FormattedMessage defaultMessage="Set your new password" description="Set new password" />
      </h2>
      <p>
        <FormattedMessage
          defaultMessage={`A strong password has been generated for you. To proceed you will need to copy the
                          password in to the Repeat new password field and click Accept Password and save it for future 
                          use. Note: spaces in the generated password are there for legibility and will be removed automatically if entered.`}
          description="Set new password"
        />
      </p>
      <div className="reset-password-input">
        <label htmlFor="copy-new-password">
          <FormattedMessage defaultMessage="New password" description="Set new password" />
        </label>
        <input
          name="copy-new-password"
          id="copy-new-password"
          ref={ref}
          defaultValue={password ? password : ""}
          readOnly={true}
        />
        <CopyToClipboard ref={ref} />
      </div>
      <NewPasswordForm
        suggested_password={suggested_password}
        extra_security={extra_security}
        submitNewPasswordForm={submitNewPasswordForm}
        goBack={goBack}
      />
    </React.Fragment>
  );
}

export function ResetPasswordSuccess(): JSX.Element {
  const toHome = useAppSelector((state) => state.config.eduid_site_link);

  return (
    <React.Fragment>
      <p>
        <FormattedMessage
          defaultMessage="Password has been updated."
          description="Reset Password set new password success"
        />
      </p>
      <a id="return-login" href={toHome}>
        <FormattedMessage defaultMessage="Go to eduID" description="Reset Password go to eduID" />
      </a>
    </React.Fragment>
  );
}
