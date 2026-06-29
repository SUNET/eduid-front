import React from "react";
import { FormattedMessage } from "react-intl";
import { FailureComponentProps } from "./Errors";
import { OtherError } from "./OtherError";

export function EduidError({ errorURL }: Readonly<FailureComponentProps>) {
  if (errorURL.rp === "authn" && errorURL.ctx === "saml_response_fail") {
    return <NotLoggedIn />;
  }
  return <OtherError />;
}

function NotLoggedIn() {
  return (
    <React.Fragment>
      <h1>
        <FormattedMessage defaultMessage="Not logged in" description="ErrorURL eduid error" />
      </h1>
      <p>
        <FormattedMessage
          defaultMessage="You are not logged in, or the session expired."
          description="ErrorURL eduid error"
        />
      </p>
    </React.Fragment>
  );
}
