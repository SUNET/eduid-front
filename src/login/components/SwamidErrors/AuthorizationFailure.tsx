import React from "react";
import { FormattedMessage } from "react-intl";
import { FailureComponentProps } from "./Errors";

export function AuthorizationFailure(props: FailureComponentProps): JSX.Element {
  return (
    <React.Fragment>
      <h1>
        <FormattedMessage defaultMessage="Insufficient privileges" description="ErrorURL authorization failure" />
      </h1>
      <p>
        <FormattedMessage
          defaultMessage="The service that you tried to access requires privileges that you do not have."
          description="ErrorURL authorization failure"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="You may need to confirm your identity in the eduID Dashboard before trying again."
          description="ErrorURL authentication failure"
        />
      </p>
    </React.Fragment>
  );
}
