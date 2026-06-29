import { EduIDButton } from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { signupSlice } from "slices/Signup";

export function SignupCredentialsError() {
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
          onClick={() => dispatch(signupSlice.actions.setNextPage("SIGNUP_ENTRY"))}
          id="abort-button"
        >
          <FormattedMessage defaultMessage="Cancel" description="button cancel" />
        </EduIDButton>
        <EduIDButton
          type="submit"
          buttonstyle="primary"
          onClick={() => {
            dispatch(signupSlice.actions.setNextPage("SIGNUP_CREDENTIALS"));
          }}
          id="retry-button"
        >
          <FormattedMessage defaultMessage="Retry" description="Signup credentials button" />
        </EduIDButton>
      </div>
    </React.Fragment>
  );
}
