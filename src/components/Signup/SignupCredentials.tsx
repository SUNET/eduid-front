import { signupApi } from "apis/eduidSignup";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { signupSlice } from "slices/Signup";

export function SignupCredentialsError(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.notifications.error);

  if (!error) {
    return null;
  }

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
          onClick={() => dispatch(signupSlice.actions.setNextPage("SIGNUP_EMAIL_FORM"))}
          id="abort-button"
        >
          <FormattedMessage defaultMessage="Cancel" description="button cancel" />
        </EduIDButton>
        <EduIDButton
          type="submit"
          buttonstyle="primary"
          onClick={() => {
            dispatch(signupSlice.actions.setNextPage("SIGNUP_CREDENTIAL_PASSWORD"));
          }}
          id="retry-button"
        >
          <FormattedMessage defaultMessage="Retry" description="Signup credentials button" />
        </EduIDButton>
      </div>
    </React.Fragment>
  );
}

export function SignupCredentialPassword(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const { isSuccess, isError } = signupApi.useGetPasswordRequestQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(signupSlice.actions.setNextPage("SIGNUP_CONFIRM_PASSWORD"));
    } else if (isError) {
      dispatch(signupSlice.actions.setNextPage("SIGNUP_CREDENTIALS_ERROR"));
    }
  }, [isSuccess, isError, dispatch]);

  return null;
}
