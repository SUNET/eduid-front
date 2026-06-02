import { skipToken } from "@reduxjs/toolkit/query";
import { signupApi } from "apis/eduidSignup";
import { CommonToU } from "components/Common/CommonToU";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { signupSlice } from "slices/Signup";
import { ServiceInfo } from "./SignupEntry";
import { SignupStepIndicator } from "./SignupStepIndicator";

export function SignupToU(): React.JSX.Element {
  const signupState = useAppSelector((state) => state.signup.state);
  const version = signupState?.tou.version;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (signupState?.tou.completed) {
      dispatch(signupSlice.actions.setNextPage("SIGNUP_ENTER_CODE"));
    }
  }, [signupState, dispatch]);

  function handleAccept() {
    dispatch(signupSlice.actions.setNextPage("PROCESS_TOU"));
  }

  function handleCancel() {
    dispatch(signupSlice.actions.setNextPage("SIGNUP_ENTRY"));
  }

  return (
    <div className="step-container">
      <section className="intro">
        <h1>
          <FormattedMessage defaultMessage="Create eduID: Confirm/Accept" description="Terms of use (heading)" />
        </h1>
        <ServiceInfo />
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage="To create your eduID account you need to accept the eduID terms of use."
              description="Terms of use (lead text)"
            />
          </p>
        </div>
      </section>

      {version && <CommonToU version={version} handleAccept={handleAccept} handleCancel={handleCancel} />}
      <SignupStepIndicator currentStep={3} />
    </div>
  );
}

export function ProcessToU(): React.JSX.Element | null {
  const signupState = useAppSelector((state) => state.signup.state);
  const dispatch = useAppDispatch();
  const version = signupState?.tou.version;
  const { isSuccess, isError } = signupApi.useAcceptToURequestQuery(version ? { version } : skipToken);

  useEffect(() => {
    if (isSuccess) {
      dispatch(signupSlice.actions.setNextPage("REGISTER_EMAIL"));
    } else if (isError) {
      dispatch(signupSlice.actions.setNextPage("SIGNUP_ENTRY"));
    }
  }, [isSuccess, isError, dispatch]);

  return null;
}
