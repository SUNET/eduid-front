import { skipToken } from "@reduxjs/toolkit/query";
import { signupApi } from "apis/eduidSignup";
import { CommonToU } from "components/Common/CommonToU";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { signupSlice } from "slices/Signup";

export function SignupToU(): React.JSX.Element {
  const signupState = useAppSelector((state) => state.signup.state);
  const version = signupState?.tou.version;
  const state = useAppSelector((state) => state.signup.state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state?.tou.completed) {
      dispatch(signupSlice.actions.setNextPage("SignupEnterCode"));
    }
  }, [state, dispatch]);

  function handleAccept() {
    dispatch(signupSlice.actions.setNextPage("ProcessToU"));
  }

  function handleCancel() {
    dispatch(signupSlice.actions.setNextPage("SignupEmailForm"));
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

export function ProcessToU(): React.JSX.Element {
  const signupState = useAppSelector((state) => state.signup.state);
  const dispatch = useAppDispatch();
  const version = signupState?.tou.version;
  const { isSuccess, isError } = signupApi.useAcceptToURequestQuery(version ? { version } : skipToken);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearNotifications());
      dispatch(signupSlice.actions.setNextPage("RegisterEmail"));
    } else if (isError) {
      dispatch(signupSlice.actions.setNextPage("SignupEmailForm"));
    }
  }, [isSuccess, isError, dispatch]);

  return <React.Fragment></React.Fragment>;
}
