import React from "react";
import { FormattedMessage } from "react-intl";
import { FailureComponentProps } from "./Errors";

export function OtherError(props: FailureComponentProps): JSX.Element {
  return (
    <React.Fragment>
      <h1>
        <FormattedMessage defaultMessage="Access Error" description="ErrorURL other error" />
      </h1>
      <p>
        <FormattedMessage
          defaultMessage="An error occurred when accessing the service."
          description="ErrorURL other error"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="You may need to confirm your identity in the eduID Dashboard before trying again."
          description="ErrorURL other error"
        />
      </p>
    </React.Fragment>
  );
}
