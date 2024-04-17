import {
  ExtraSecurityAlternatives,
  postSetNewPassword,
  postSetNewPasswordExternalMfa,
  postSetNewPasswordExtraSecurityPhone,
  postSetNewPasswordExtraSecurityToken,
} from "apis/eduidResetPassword";
import { CopyToClipboard } from "components/Common/CopyToClipboard";
import CustomInput from "components/Common/CustomInput";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { emptyStringPattern } from "helperFunctions/validation/regexPatterns";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import resetPasswordSlice from "slices/ResetPassword";
import { GoBackButton } from "./GoBackButton";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

const newPasswordFormId = "new-password-form";

interface NewPasswordFormData {
  newPassword?: string;
}

interface NewPasswordFormProps {
  extra_security?: ExtraSecurityAlternatives;
  suggested_password: string | undefined;
}

function NewPasswordForm(props: NewPasswordFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const selected_option = useAppSelector((state) => state.resetPassword.selected_option);
  const email_code = useAppSelector((state) => state.resetPassword.email_code);
  const phone_code = useAppSelector((state) => state.resetPassword.phone.phone_code);
  const webauthn_assertion = useAppSelector((state) => state.resetPassword.webauthn_assertion);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  function validateNewPassword(values: NewPasswordFormData) {
    const newPassword = values.newPassword;
    const errors: NewPasswordFormData = {};

    if (!newPassword || emptyStringPattern.test(newPassword)) {
      errors.newPassword = "required";
    } else if (newPassword?.replace(/\s/g, "") !== props.suggested_password?.replace(/\s/g, "")) {
      // Remove whitespace from both passwords before comparing
      errors.newPassword = "chpass.different-repeat";
    }
    return errors;
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

  function goBack() {
    resetPasswordContext.resetPasswordService.send({ type: "GO_BACK" });
    // initialization of state
    dispatch(resetPasswordSlice.actions.resetState());
  }

  return (
    <FinalForm<NewPasswordFormData>
      onSubmit={submitNewPasswordForm}
      validate={validateNewPassword}
      render={(formProps) => {
        return (
          <form id={newPasswordFormId} onSubmit={formProps.handleSubmit}>
            <input
              autoComplete="new-password"
              type="password"
              name="display-none-new-password"
              id="display-none-new-password"
              defaultValue={formProps.values.newPassword ? formProps.values.newPassword : ""}
            />
            <FinalField
              id="new-password"
              type="text"
              name="newPassword"
              component={CustomInput}
              required={true}
              label={<FormattedMessage defaultMessage="Repeat new password" description="Set new password" />}
              placeholder="xxxx xxxx xxxx"
              autoFocus={true}
            />

            <div className="buttons">
              {props.extra_security && Object.keys(props.extra_security).length > 0 && (
                <GoBackButton onClickHandler={goBack} />
              )}
              <EduIDButton buttonstyle="primary" id="new-password-button" disabled={formProps.invalid}>
                <FormattedMessage defaultMessage="accept password" description="Set new password (accept button)" />
              </EduIDButton>
            </div>
          </form>
        );
      }}
    />
  );
}

export function SetNewPassword(): JSX.Element | null {
  const suggested_password = useAppSelector((state) => state.resetPassword.suggested_password);
  const extra_security = useAppSelector((state) => state.resetPassword.extra_security);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPassword(suggested_password);
  }, [suggested_password]);

  if (suggested_password === undefined) {
    return null;
  }

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage defaultMessage="Set your new password" description="Set new password" />
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
      <NewPasswordForm suggested_password={suggested_password} extra_security={extra_security} />
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
            defaultMessage="Password reset completed"
            description="Reset Password set new password success heading"
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage={`These are your new password for eduID. Save the password! 
                Once you've logged in it is possible to change your password.`}
              description="Reset Password set new password success lead"
            />
          </p>
        </div>
      </section>
      <div id="email-display">
        <fieldset>
          <label htmlFor="user-email">
            <FormattedMessage defaultMessage="Email address" description="Email label" />
          </label>
          <div className="display-data">
            <output id="user-email">{email_address}</output>
          </div>
        </fieldset>
        <fieldset>
          <label htmlFor="user-password">
            <FormattedMessage defaultMessage="Password" description="Password label" />
          </label>
          <div className="display-data">
            <mark className="force-select-all">
              <output id="user-password">{new_password}</output>
            </mark>
          </div>
        </fieldset>
      </div>
      <div className="buttons">
        <EduIDButton id="reset-password-finished" buttonstyle="link" className="normal-case" type="submit">
          <FormattedMessage defaultMessage="Go to eduid to login" description="go to eudID link text" />
        </EduIDButton>
      </div>
    </form>
  );
}
