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
      // signupContext.signupService.send({ type: "TOU_DONE" });
    }
  }, [signupContext.signupService, state]);

  function handleAccept() {
    dispatch(signupSlice.actions.setNextPage("ProcessToU"));
    // signupContext.signupService.send({ type: "COMPLETE" });
  }

  function handleCancel() {
    dispatch(signupSlice.actions.setNextPage("SignupEmailForm"));
    // signupContext.signupService.send({ type: "ABORT" });
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
      // signupContext.signupService.send({ type: "API_SUCCESS" });
    } else if (isError) {
      dispatch(signupSlice.actions.setNextPage("SignupEmailForm"));
      // signupContext.signupService.send({ type: "API_FAIL" });
    }
<<<<<<< HEAD
  }, [isSuccess, isError, dispatch, signupContext.signupService]);
=======
  }, [isSuccess, isError]);
>>>>>>> 851dd2d94 (WIP: remove state machine, use actions for next page navigation)

  return <React.Fragment></React.Fragment>;
}
