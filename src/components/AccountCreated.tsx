import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

function AccountCreated(props: { email: string }) {
  return (
    <div className="horizontal-content-margin content">
      <h1 className="register-header">
        <FormattedMessage
          defaultMessage="A link has been sent to your email address."
          description="Register Account created"
        />
      </h1>
      <div id="email-display">
        <p className="preamble">
          <FormattedMessage
            defaultMessage="Complete registration by clicking the link sent to:"
            description="Register email label"
          />
        </p>
        <h4 className="register-header registered-email">{props.email}</h4>
      </div>
    </div>
  );
}

export default AccountCreated;
