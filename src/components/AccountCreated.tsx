import React from "react";
import { FormattedMessage } from "react-intl";
import { useSignupAppSelector } from "signup-hooks";

function AccountCreated() {
  const email = useSignupAppSelector((state) => state.signup.email);

  return (
    <React.Fragment>
      <h1 className="register-header">
        <FormattedMessage defaultMessage="A link has been sent to your email address." description="Signup" />
      </h1>
      <div id="email-display">
        <p>
          <FormattedMessage defaultMessage="Complete registration by clicking the link sent to:" description="Signup" />
        </p>
        <h4 className="register-header registered-email">{email}</h4>
      </div>
    </React.Fragment>
  );
}

export default AccountCreated;
