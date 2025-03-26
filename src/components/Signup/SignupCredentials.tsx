import { useSelector } from "@xstate/react";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch } from "eduid-hooks";
import React, { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { signupApi } from "services/signup";
import { clearNotifications } from "slices/Notifications";
import { SignupGlobalStateContext } from "./SignupGlobalState";

export function SignupCredentials(): JSX.Element {
  const signupContext = useContext(SignupGlobalStateContext);
  const state = useSelector(signupContext.signupService, (s) => s);

  useEffect(() => {
    if (state.context.event?.type != "API_FAIL") {
      // unless we got back here from CreateUser after a backend API error, go straight to using a password for now
      signupContext.signupService.send({ type: "CHOOSE_PASSWORD" });
    }
  }, []);

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
            onClick={() => signupContext.signupService.send({ type: "ABORT" })}
            id="abort-button"
          >
            <FormattedMessage defaultMessage="Cancel" description="button cancel" />
          </EduIDButton>
          <EduIDButton
            type="submit"
            buttonstyle="primary"
            onClick={() => signupContext.signupService.send({ type: "CHOOSE_PASSWORD" })}
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

export function SignupCredentialPassword(): JSX.Element {
  const signupContext = useContext(SignupGlobalStateContext);
  const dispatch = useAppDispatch();
  const { isSuccess, isError } = signupApi.useGetPasswordRequestQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearNotifications());
      signupContext.signupService.send({ type: "API_SUCCESS" });
    } else if (isError) {
      signupContext.signupService.send({ type: "API_FAIL" });
    }
  }, [isSuccess, isError]);

  return <React.Fragment></React.Fragment>;
}
