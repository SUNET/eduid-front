import React from "react";
import { FormattedMessage } from "react-intl";
import { useSignupAppSelector } from "signup-hooks";
import EduIDButton from "./EduIDButton";

export default function EmailInUse(): JSX.Element {
  const email = useSignupAppSelector((state) => state.signup.email);
  const reset_password_link = useSignupAppSelector((state) => state.config.reset_password_link);

  return (
    <React.Fragment>
      <div>
        <h3 className="register-header">
          <FormattedMessage
            defaultMessage="An eduID is already using {email}"
            description="Signup"
            values={{ email: email }}
          />
        </h3>
        <div id="email-display">
          <p>
            <FormattedMessage
              defaultMessage="If this is your eduID, you can reset your password to log back in."
              description="Signup"
            />
          </p>
        </div>

        <a href={reset_password_link}>
          <EduIDButton buttonstyle="primary" id="reset-password">
            <FormattedMessage defaultMessage="Reset your password" description="Signup" />
          </EduIDButton>
        </a>
      </div>
    </React.Fragment>
  );
}
