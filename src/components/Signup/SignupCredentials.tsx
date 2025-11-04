import { signupApi } from "apis/eduidSignup";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { signupSlice } from "slices/Signup";

export function SignupCredentials(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.notifications.error);

  useEffect(() => {
    if (error === undefined) {
      // unless we got back here from CreateUser after a backend API error, go straight to using a password for now
      dispatch(signupSlice.actions.setNextPage("SignupCredentialPassword"));
    }
  }, []);

  if (error) {
    return (
      <React.Fragment>
        <p>
          <FormattedMessage
            defaultMessage="There was a problem creating your account."
            description="Signup credentials"
          />
        </p>
        <div className="buttons">
          <EduIDButton
            type="submit"
            buttonstyle="secondary"
            onClick={() => dispatch(signupSlice.actions.setNextPage("SignupEmailForm"))}
            id="abort-button"
          >
            <FormattedMessage defaultMessage="Cancel" description="button cancel" />
          </EduIDButton>
          <EduIDButton
            type="submit"
            buttonstyle="primary"
            onClick={() => {
              dispatch(signupSlice.actions.setNextPage("SignupCredentialPassword"));
            }}
            id="retry-button"
          >
            <FormattedMessage defaultMessage="Retry" description="Signup credentials button" />
          </EduIDButton>
        </div>
      </React.Fragment>
    );
  }

  return <React.Fragment></React.Fragment>;
}

export function SignupCredentialPassword(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { isSuccess, isError } = signupApi.useGetPasswordRequestQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearNotifications());
      dispatch(signupSlice.actions.setNextPage("SignupConfirmPassword"));
    } else if (isError) {
      dispatch(signupSlice.actions.setNextPage("SignupCredentials"));
    }
  }, [isSuccess, isError, dispatch]);

  return <React.Fragment></React.Fragment>;
}
