import { acceptToURequest } from "apis/eduidSignup";
import { CommonToU } from "components/CommonToU";
import React, { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useSignupAppDispatch, useSignupAppSelector } from "signup-hooks";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export function SignupToU(): JSX.Element {
  const signupState = useSignupAppSelector((state) => state.signup.state);
  const version = signupState?.tou.version;
  const signupContext = useContext(SignupGlobalStateContext);

  function handleAccept() {
    signupContext.signupService.send({ type: "COMPLETE" });
  }

  function handleCancel() {
    signupContext.signupService.send({ type: "ABORT" });
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

export function ProcessToU(): JSX.Element {
  const signupState = useSignupAppSelector((state) => state.signup.state);
  const version = signupState?.tou.version;
  const signupContext = useContext(SignupGlobalStateContext);
  const dispatch = useSignupAppDispatch();

  async function sendToUAcceptance(version: string) {
    const res = await dispatch(acceptToURequest({ version }));

    if (acceptToURequest.fulfilled.match(res)) {
      signupContext.signupService.send({ type: "API_SUCCESS" });
    } else {
      signupContext.signupService.send({ type: "API_FAIL" });
    }
  }

  useEffect(() => {
    if (version) {
      sendToUAcceptance(version);
    }
  }, []);

  return <React.Fragment></React.Fragment>;
}
