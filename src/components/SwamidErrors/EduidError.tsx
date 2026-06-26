import React from "react";
import { FormattedMessage } from "react-intl";
import { FailureComponentProps } from "./Errors";
import { OtherError } from "./OtherError";

<<<<<<< HEAD
export function EduidError(props: Readonly<FailureComponentProps>): React.JSX.Element {
  // saml_response_unsolicited means the SAML response did not establish a session either, so it
  // gets the same message as saml_response_fail.
  if (
    props.errorURL.rp === "authn" &&
    (props.errorURL.ctx === "saml_response_fail" || props.errorURL.ctx === "saml_response_unsolicited")
  ) {
=======
export function EduidError({ errorURL }: Readonly<FailureComponentProps>): React.JSX.Element {
  if (errorURL.rp === "authn" && errorURL.ctx === "saml_response_fail") {
>>>>>>> 4d7dae567 (destructure component props for readability)
    return <NotLoggedIn />;
  }
  return <OtherError />;
}

function NotLoggedIn(): React.JSX.Element {
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
