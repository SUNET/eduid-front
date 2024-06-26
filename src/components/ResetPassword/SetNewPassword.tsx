import {
  postSetNewPassword,
  postSetNewPasswordExternalMfa,
  postSetNewPasswordExtraSecurityPhone,
  postSetNewPasswordExtraSecurityToken,
} from "apis/eduidResetPassword";
import { ConfirmUserInfo } from "components/Common/ConfirmUserInfo";
import { CopyToClipboard } from "components/Common/CopyToClipboard";
import EduIDButton from "components/Common/EduIDButton";
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
      <section className="intro">
        <h1>
          <FormattedMessage defaultMessage="Reset Password: Set new password" description="Set new password" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage={`A strong password has been generated for you. To proceed you will need to copy the
                          password in to the Repeat new password field and click Accept Password and save it for future 
                          use. Note: spaces in the generated password are there for legibility and will be removed automatically if entered.`}
              description="Set new password"
            />
          </p>
        </div>
      </section>
      <div className="copy-password-input">
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
        submitButtonText={
          <FormattedMessage defaultMessage="accept password" description="Set new password (accept button)" />
        }
      />
    </React.Fragment>
  );
}

export function ResetPasswordSuccess(): JSX.Element {
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const new_password = useAppSelector((state) => state.resetPassword.new_password);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);

  return (
    <form method="GET" action={dashboard_link}>
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Reset Password: Completed"
            description="Reset Password set new password success heading"
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage={`These is your new password for eduID. Save the password! 
                Once you've logged in it is possible to change your password.`}
              description="Reset Password set new password success lead"
            />
          </p>
        </div>
      </section>
      <ConfirmUserInfo email_address={email_address as string} new_password={new_password as string} />
      <div className="buttons">
        <EduIDButton id="reset-password-finished" buttonstyle="link" className="normal-case" type="submit">
          <FormattedMessage defaultMessage="Go to eduid to login" description="go to eudID link text" />
        </EduIDButton>
      </div>
    </form>
  );
}
