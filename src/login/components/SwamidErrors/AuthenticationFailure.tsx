import React from "react";
import { FormattedMessage } from "react-intl";
import { FailureComponentProps } from "./Errors";

export function AuthenticationFailure(props: FailureComponentProps): JSX.Element {
  return (
    <React.Fragment>
      <h1>
        <FormattedMessage defaultMessage="Authentication error" description="ErrorURL authentication failure" />
      </h1>
      <p>
        <FormattedMessage
          defaultMessage="The service you tried to access failed during the authentication stage."
          description="ErrorURL authentication failure"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="This may be because it requires additional steps which did not occur during login
                           (such as using a second factor). Please try again."
          description="ErrorURL authentication failure"
        />
      </p>
    </React.Fragment>
  );
}
