import { skipToken } from "@reduxjs/toolkit/query";
import { signupApi } from "apis/eduidSignup";
import EduIDButton from "components/Common/EduIDButton";
import { ResponseCodeButtons } from "components/Common/ResponseCodeAbortButton";
import { TimeRemainingWrapper } from "components/Common/TimeRemaining";
import { ExpiresMeter } from "components/Login/ExpiresMeter";
import { ResponseCodeForm, ResponseCodeValues } from "components/Login/ResponseCodeForm";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { Fragment, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { signupSlice } from "slices/Signup";

export function SignupEnterCode(): React.JSX.Element {
  const signupState = useAppSelector((state) => state.signup.state);
  const dispatch = useAppDispatch();
  const [isExpired, setIsExpired] = useState(false);
  const state = useAppSelector((state) => state.signup.state);
  const [resendCode] = signupApi.useLazyRegisterEmailRequestQuery();

  useEffect(() => {
    if (state?.credentials.completed) {
      // signupContext.signupService.send({ type: "CREDENTIALS_DONE" });
    }
  }, [signupContext.signupService, state]);

  useEffect(() => {
    if (signupState?.email.bad_attempts && signupState?.email.bad_attempts === signupState?.email.bad_attempts_max) {
      // user has used up all allowed attempts to enter the code
      dispatch(signupSlice.actions.setNextPage("SignupEmailForm"));
      // signupContext.signupService.send({ type: "ABORT" });
    }
  }, [signupContext.signupService, signupState]);

  function handleTimerReachZero() {
    setIsExpired(true);
  }

  async function registerEmail() {
    if (signupState?.email.address && signupState?.name?.given_name && signupState?.name?.surname) {
      const result = await resendCode({
        email: signupState?.email.address,
        given_name: signupState?.name?.given_name,
        surname: signupState?.name?.surname,
      });
      if (result.isSuccess) {
        setIsExpired(false);
      }
    }
  }

  function handleAbortButtonOnClick(event?: React.MouseEvent<HTMLButtonElement>) {
    event?.preventDefault();
    dispatch(signupSlice.actions.setNextPage("SignupEmailForm"));
    // signupContext.signupService.send({ type: "ABORT" });
  }

  function handleSubmitCode(values: ResponseCodeValues) {
    const code = values.v.join("");

    const match = code.match(/^\d\d\d\d\d\d$/);
    if (match?.length == 1) {
      // match[0] is whole matched string
      const digits = match[0];

      if (digits) {
        // remember the code in redux store between states
        dispatch(signupSlice.actions.setEmailCode(digits));
        dispatch(signupSlice.actions.setNextPage("ProcessEmailCode"));
        // signupContext.signupService.send({ type: "COMPLETE" });
      }
    }
  }

  if (isExpired) {
    return (
      <div>
        <h1>
          <FormattedMessage defaultMessage="Register: Code expired" description="Signup" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage="The code sent to {email} has expired."
              values={{
                email: (
                  <span id="email_address">
                    <output data-testid="email-address">
                      <strong>{signupState?.email.address}</strong>
                    </output>
                  </span>
                ),
              }}
            />
          </p>
        </div>
        <p>
          <FormattedMessage
            defaultMessage="Click the link below to receive a new code. You will be redirected to a page where you can enter the new code."
            description="Signup, code expired"
          />
        </p>

        <EduIDButton buttonstyle="link lowercase" onClick={registerEmail} id="send-new-code">
          <FormattedMessage defaultMessage="Send a new code" description="send a new code" />
        </EduIDButton>
      </div>
    );
  }

  // Not expired, show six input fields, a count down timer and an abort button

  return (
    <Fragment>
      <h1>
        <FormattedMessage defaultMessage="Register: Verification of email address" description="Signup" />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage={`Enter the six digit code sent from no-reply@eduid.se to {email} to verify your email address. You can also copy 
            and paste the code from the email into the input field.`}
            values={{
              email: (
                <span id="email_address">
                  <output data-testid="email-address">
                    <strong>{signupState?.email.address}</strong>
                  </output>
                </span>
              ),
            }}
          />
        </p>
      </div>

      <div className="signup-timer-wrapper">
        <p>
          <FormattedMessage defaultMessage="Code expires in" description="Short code form" />
        </p>
        <TimeRemainingWrapper
          name="signup-email-expires"
          unique_id="signup.email"
          value={signupState?.email.expires_time_left || 0}
          onReachZero={handleTimerReachZero}
        >
          <ExpiresMeter showMeter={false} expires_max={signupState?.email.expires_time_max || 0} />
        </TimeRemainingWrapper>
      </div>

      <div className="enter-code">
        <ResponseCodeForm inputsDisabled={false} handleSubmitCode={handleSubmitCode}>
          <ResponseCodeButtons handleAbortButtonOnClick={handleAbortButtonOnClick} />
        </ResponseCodeForm>
      </div>
    </Fragment>
  );
}

export function ProcessEmailCode() {
  const verification_code = useAppSelector((state) => state.signup.email_code);
  const dispatch = useAppDispatch();
  const { isSuccess, isError } = signupApi.useVerifyEmailRequestQuery(
    verification_code ? { verification_code } : skipToken
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearNotifications());
      dispatch(signupSlice.actions.setNextPage("SignupCredentials"));
      // signupContext.signupService.send({ type: "API_SUCCESS" });
    } else if (isError) {
      dispatch(signupSlice.actions.setNextPage("SignupEnterCode"));
      // signupContext.signupService.send({ type: "API_FAIL" });
    }
  }, [isSuccess, isError, dispatch, signupContext.signupService]);

  return null;
}
