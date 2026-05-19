import { skipToken } from "@reduxjs/toolkit/query";
import { signupApi } from "apis/eduidSignup";
import { CommonToU } from "components/Common/CommonToU";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { signupSlice } from "slices/Signup";

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
    dispatch(signupSlice.actions.setNextPage("SIGNUP_EMAIL_FORM"));
  }

  return (
    <React.Fragment>
      <div className="step-container">
        <h1>
          <FormattedMessage defaultMessage="Create eduID: Accept Terms of Use" description="Terms of use (heading)" />
        </h1>
        <p className="destination-info">
          In order to access <strong>the thing</strong>
        </p>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage="To create your eduID you need to accept the eduID terms of use."
              description="Terms of use (lead text)"
            />
          </p>
        </div>

        {version && <CommonToU version={version} handleAccept={handleAccept} handleCancel={handleCancel} />}

        <hr className="border-line border-line-lesser" />
        <div className="step-indicator">
          <div className="completed">1</div>
          <div className="completed">2</div>
          <div className="active">3</div>
          <div>4</div>
          <div>5</div>
        </div>
      </div>
    </React.Fragment>
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
      dispatch(signupSlice.actions.setNextPage("SIGNUP_EMAIL_FORM"));
    }
  }, [isSuccess, isError, dispatch]);

  return null;
}
