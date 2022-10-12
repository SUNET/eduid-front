import EduIDButton from "components/EduIDButton";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useSignupAppSelector } from "signup-hooks";

// element ids used in tests
export const idUserEmail = "user-email";
export const idUserPassword = "user-password";
export const idFinishedButton = "finished-button";

export function SignupFinished(): JSX.Element {
  const signupState = useSignupAppSelector((state) => state.signup.state);
  const dashboard_url = useSignupAppSelector((state) => state.config.dashboard_url);

  // TODO: Ask user if they want to create a password or use a password-less login method
  //signupContext.signupService.send({ type: "CHOOSE_PASSWORD" });

  return (
    <form method="GET" action={dashboard_url}>
      <h1 className="register-header">
        <FormattedMessage
          defaultMessage="You have completed the registration for eduID."
          description="Registration complete"
        />
      </h1>
      <p>
        <FormattedMessage
          defaultMessage="These are your login details for eduID."
          description="Registration finished"
        />
      </p>
      <div id="email-display">
        <fieldset>
          <label htmlFor={idUserEmail}>
            <FormattedMessage defaultMessage="Email address" description="Email label" />
          </label>
          <div className="register-header display-data">
            <output id={idUserEmail}>{signupState?.email.address}</output>
          </div>
        </fieldset>
        <fieldset>
          <label htmlFor={idUserPassword}>
            <FormattedMessage defaultMessage="Password" description="Password label" />
          </label>
          <div className="register-header registered-email display-data">
            <mark className="force-select-all">
              <output id={idUserPassword}>{signupState?.credentials.password}</output>
            </mark>
          </div>
        </fieldset>
      </div>
      <div className="buttons">
        <EduIDButton id={idFinishedButton} buttonstyle="link" className="normal-case" type="submit">
          <FormattedMessage defaultMessage="Go to my eduid" description="go to eudID link text" />
        </EduIDButton>
      </div>
    </form>
  );
  return <React.Fragment></React.Fragment>;
}
