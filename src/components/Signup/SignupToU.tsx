import { acceptToURequest } from "apis/eduidSignup";
import { CommonToU } from "components/Common/CommonToU";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export function SignupToU(): JSX.Element {
  const signupState = useAppSelector((state) => state.signup.state);
  const signupContext = useContext(SignupGlobalStateContext);
  const version = signupState?.tou.version;
  const state = useAppSelector((state) => state.signup.state);

  useEffect(() => {
    if (state?.tou.completed) {
      signupContext.signupService.send({ type: "BYPASS" });
    }
  }, [state]);

  function handleAccept() {
    signupContext.signupService.send({ type: "COMPLETE" });
  }

  function handleCancel() {
    signupContext.signupService.send({ type: "ABORT" });
  }

  return (
    <React.Fragment>
      <h1>
        <FormattedMessage defaultMessage="Register: Terms of use" description="Terms of use (heading)" />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage="To create your eduID you need to accept the eduID terms of use."
            description="Terms of use (lead text)"
          />
        </p>
      </div>

      {version && <CommonToU version={version} handleAccept={handleAccept} handleCancel={handleCancel} />}
    </React.Fragment>
  );
}

export function ProcessToU(): JSX.Element {
  const signupState = useAppSelector((state) => state.signup.state);
  const signupContext = useContext(SignupGlobalStateContext);
  const dispatch = useAppDispatch();
  const version = signupState?.tou.version;

  async function sendToUAcceptance(version: string) {
    const res = await dispatch(acceptToURequest({ version }));

    if (acceptToURequest.fulfilled.match(res)) {
      dispatch(clearNotifications());
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
