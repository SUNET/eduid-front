import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useSignupAppSelector } from "signup-hooks";
import { CommonToU } from "components/CommonToU";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export function SignupToU(): JSX.Element {
  const signupState = useSignupAppSelector((state) => state.signup.state);
  const version = signupState?.tou.version;
  const signupContext = useContext(SignupGlobalStateContext);

  function handleAccept() {
    signupContext.signupService.send({ type: "TOU_SUCCESS" });
  }

  function handleCancel() {
    signupContext.signupService.send({ type: "TOU_FAIL" });
  }

  return (
    <React.Fragment>
      <h1>
        <FormattedMessage defaultMessage="Terms of use" description="Terms of use (h2 heading)" />
      </h1>
      <div className="lead">
        <p tabIndex={0}>
          <FormattedMessage
            defaultMessage="To create your eduID you need to accept the eduID terms of use."
            description="Terms of use (banner text)"
          />
        </p>
      </div>

      {version && <CommonToU version={version} handleAccept={handleAccept} handleCancel={handleCancel} />}
    </React.Fragment>
  );
}
