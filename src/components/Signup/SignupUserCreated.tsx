import { createUserRequest } from "apis/eduidSignup";
import { ConfirmUserInfo, EmailFieldset } from "components/Common/ConfirmUserInfo";
import { CopyToClipboard } from "components/Common/CopyToClipboard";
import EduIDButton from "components/Common/EduIDButton";
import { NewPasswordForm, NewPasswordFormData } from "components/Common/NewPasswordForm";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useContext, useRef } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { SignupGlobalStateContext } from "./SignupGlobalState";

// element ids used in tests
export const idUserEmail = "user-email";
export const idUserPassword = "user-password";
export const idFinishedButton = "finished-button";

export function SignupConfirmPassword() {
  const dispatch = useAppDispatch();
  const signupContext = useContext(SignupGlobalStateContext);
  const signupState = useAppSelector((state) => state.signup.state);
  const ref = useRef<HTMLInputElement>(null);

  async function submitNewPasswordForm(values: NewPasswordFormData) {
    const newPassword = values.newPassword;
    if (!newPassword) {
      return;
    } else {
      const res = await dispatch(createUserRequest({ use_password: true }));

      if (createUserRequest.fulfilled.match(res)) {
        dispatch(clearNotifications());
        signupContext.signupService.send({ type: "API_SUCCESS" });
      } else {
        signupContext.signupService.send({ type: "API_FAIL" });
      }
    }
  }

  return (
    <React.Fragment>
      <h1>
        <FormattedMessage
          defaultMessage="Register: Confirm your password"
          description="Registration confirm password"
        />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage={`A password has been generated for you. you can easily copy and paste your password by clicking the copy to clipboard button.`}
            description="Registration copy and paste password"
          />
        </p>
      </div>
      <div id="email-display">
        <EmailFieldset email={signupState?.email.address} />
        <fieldset>
          <label htmlFor={idUserPassword}>
            <FormattedMessage defaultMessage="Password" description="Password label" />
          </label>
          <div className="display-data">
            <mark className="force-select-all">
              <input
                name="copy-new-password"
                id="copy-new-password"
                ref={ref}
                defaultValue={
                  signupState?.credentials.generated_password
                    ? formatPassword(signupState?.credentials.generated_password)
                    : ""
                }
                readOnly={true}
              />
              <CopyToClipboard ref={ref} />
            </mark>
            <NewPasswordForm
              suggested_password={signupState?.credentials.generated_password}
              submitNewPasswordForm={submitNewPasswordForm}
              submitButtonText={<FormattedMessage defaultMessage="Ok" description="ok button" />}
            />
          </div>
        </fieldset>
      </div>
    </React.Fragment>
  );
}

export function SignupUserCreated(): JSX.Element {
  const signupState = useAppSelector((state) => state.signup.state);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);

  return (
    <form method="GET" action={dashboard_link}>
      <h1>
        <FormattedMessage defaultMessage="Register: Completed" description="Registration complete" />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage={`These are your login details for eduID. 
              Save the password! Note: spaces in the generated password are there for legibility and will be removed automatically if entered. Once you've logged in it is possible to change your password.`}
            description="Registration finished"
          />
        </p>
      </div>
      <ConfirmUserInfo
        email_address={signupState?.email.address as string}
        new_password={formatPassword(signupState?.credentials.generated_password)}
      />
      <div className="buttons">
        <EduIDButton id={idFinishedButton} buttonstyle="link" className="normal-case" type="submit">
          <FormattedMessage defaultMessage="Go to eduid to login" description="go to eudID link text" />
        </EduIDButton>
      </div>
    </form>
  );
}

// Show passwords in groups of four characters.
// Export this for use in tests.
export function formatPassword(data?: string): string {
  if (!data) {
    return "";
  }
  const res = data.match(/.{1,4}/g);
  if (res) {
    return res.join(" ");
  }
  return "";
}
