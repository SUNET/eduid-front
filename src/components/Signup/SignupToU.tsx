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
  const state = useAppSelector((state) => state.signup.state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state?.tou.completed) {
      dispatch(signupSlice.actions.setNextPage("SIGNUP_ENTER_CODE"));
    }
  }, [state, dispatch]);

  function handleAccept() {
    dispatch(signupSlice.actions.setNextPage("PROCESS_TOU"));
  }

  function handleCancel() {
    dispatch(signupSlice.actions.setNextPage("SIGNUP_EMAIL_FORM"));
  }

  return (
    <React.Fragment>
      <h1>
        <FormattedMessage defaultMessage="Create eduID: Terms of use" description="Terms of use (heading)" />
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
