import { useSelector } from "@xstate/react";
import { signupApi } from "apis/eduidSignup";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch } from "eduid-hooks";
import React, { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { signupSlice } from "slices/Signup";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export function SignupCredentials(): React.JSX.Element {
  const signupContext = useContext(SignupGlobalStateContext);
  const state = useSelector(signupContext.signupService, (s) => s);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state.context.event?.type != "API_FAIL") {
      // unless we got back here from CreateUser after a backend API error, go straight to using a password for now
      // signupContext.signupService.send({ type: "CHOOSE_PASSWORD" });
      dispatch(signupSlice.actions.setNextPage("SignupCredentialPassword"));
    }
  }, [signupContext.signupService, state.context.event?.type]);

  if (state.context.event?.type == "API_FAIL") {
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
            onClick={() => dispatch(signupSlice.actions.setNextPage("SignupEmailForm "))}
            // signupContext.signupService.send({ type: "ABORT" })}
            id="abort-button"
          >
            <FormattedMessage defaultMessage="Cancel" description="button cancel" />
          </EduIDButton>
          <EduIDButton
            type="submit"
            buttonstyle="primary"
            onClick={() => {
              dispatch(signupSlice.actions.setNextPage("SignupCredentialPassword"));
              // signupContext.signupService.send({ type: "CHOOSE_PASSWORD" });
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
  const signupContext = useContext(SignupGlobalStateContext);
  const dispatch = useAppDispatch();
  const { isSuccess, isError } = signupApi.useGetPasswordRequestQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearNotifications());
      // signupContext.signupService.send({ type: "API_SUCCESS" });
      dispatch(signupSlice.actions.setNextPage("SignupConfirmPassword"));
    } else if (isError) {
      dispatch(signupSlice.actions.setNextPage("SignupCredentials"));
      // signupContext.signupService.send({ type: "API_FAIL" });
    }
  }, [isSuccess, isError, dispatch, signupContext.signupService]);

  return <React.Fragment></React.Fragment>;
}
