import React from "react";
import { FormattedMessage } from "react-intl";

export function AuthorizationFailure(): React.JSX.Element {
  return (
    <React.Fragment>
      <h1>
        <FormattedMessage id="authzFailure.heading" defaultMessage="Insufficient privileges" description="ErrorURL authorization failure" />
      </h1>
      <p>
        <FormattedMessage
          id="authzFailure.body"
          defaultMessage="The service that you tried to access requires privileges that you do not have."
          description="ErrorURL authorization failure"
        />
      </p>
      <p>
        <FormattedMessage
          id="common.confirmIdentityHint"
          defaultMessage="You may need to confirm your identity in the eduID Dashboard before trying again."
          description="ErrorURL authentication failure"
        />
      </p>
    </React.Fragment>
  );
}
