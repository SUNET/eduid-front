import { useAppSelector } from "eduid-hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import EduIDButton from "./EduIDButton";

// identifiers used in tests
export const registerHeaderClass = "register-header";
export const resetPasswordLinkId = "reset-password";

export default function EmailInUse(): JSX.Element {
  const email = useAppSelector((state) => state.signup.email);
  const reset_password_link = useAppSelector((state) => state.config.reset_password_link);

  return (
    <React.Fragment>
      <div>
        <h3 className={registerHeaderClass}>
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

        <a href={reset_password_service_url}>
          <EduIDButton buttonstyle="primary" id={resetPasswordLinkId}>
            <FormattedMessage defaultMessage="Reset your password" description="Signup" />
          </EduIDButton>
        </a>
      </div>
    </React.Fragment>
  );
}
