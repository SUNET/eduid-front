import React from "react";
import { FormattedMessage } from "react-intl";
import { FailureComponentProps } from "./Errors";

export function UnknownError(props: FailureComponentProps): JSX.Element {
  return (
    <React.Fragment>
      <h1>
        <FormattedMessage defaultMessage="Access Error" description="ErrorURL unknown error" />
      </h1>
      <p>
        <FormattedMessage
          defaultMessage="An unknown error occurred when accessing the service."
          description="ErrorURL unknown error"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="Please try again. Contact eduID support if the problem persists, and make sure to
                           include the Technical Information below."
          description="ErrorURL other error"
        />
      </p>
    </React.Fragment>
  );
}
