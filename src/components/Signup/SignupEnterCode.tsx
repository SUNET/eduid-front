import { verifyEmailRequest } from "apis/eduidSignup";
import EduIDButton from "components/Common/EduIDButton";
import { TimeRemainingWrapper } from "components/Common/TimeRemaining";
import { ExpiresMeter } from "components/Login/ExpiresMeter";
import { ResponseCodeForm, ResponseCodeValues } from "components/Login/ResponseCodeForm";
import { useIndexAppDispatch as useSignupAppDispatch, useIndexAppSelector as useSignupAppSelector } from "eduid-hooks";
import { Fragment, useContext, useEffect, useState } from "react";
import { FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { signupSlice } from "slices/Signup";
import { SignupGlobalStateContext } from "./SignupGlobalState";

interface ResponseCodeButtonsProps {
  formProps?: FormRenderProps<ResponseCodeValues>;
}

export function SignupEnterCode(): JSX.Element {
  const signupState = useSignupAppSelector((state) => state.signup.state);
  const signupContext = useContext(SignupGlobalStateContext);
  const dispatch = useSignupAppDispatch();
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (signupState?.email.bad_attempts && signupState?.email.bad_attempts === signupState?.email.bad_attempts_max) {
      // user has used up all allowed attempts to enter the code
      signupContext.signupService.send({ type: "ABORT" });
    }
  }, [signupState]);

  function handleTimerReachZero() {
    setIsExpired(true);
  }

  function handleAbortButtonOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    signupContext.signupService.send({ type: "ABORT" });
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

        signupContext.signupService.send({ type: "COMPLETE" });
      }
    }
  }

  function ResponseCodeButtons(props: ResponseCodeButtonsProps) {
    if (!props.formProps) {
      return null;
    }

    // 'convert' from FormRenderProps to a simple "disabled" boolean
    return <ResponseCodeAbortButton disabled={props.formProps.submitting} />;
  }

  function ResponseCodeAbortButton(props: { disabled: boolean }) {
    // abort button usable from both ResponseCodeButtons and when isExpired below
    return (
      <div className="buttons">
        <EduIDButton
          type="submit"
          buttonstyle="secondary"
          onClick={handleAbortButtonOnClick}
          id="response-code-abort-button"
          disabled={props.disabled}
        >
          <FormattedMessage defaultMessage="Cancel" description="Short code form" />
        </EduIDButton>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div>
        <h1>
          <FormattedMessage defaultMessage="Code expired" description="Signup" />
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
            defaultMessage="To get a new code, click the link below. You will be redirected to the register page."
            description="Signup, code expired"
          />
        </p>

        <EduIDButton
          buttonstyle="link"
          className="lowercase"
          onClick={handleAbortButtonOnClick}
          id="return-to-register-button"
        >
          <FormattedMessage defaultMessage="Return to Register" description="Return to register" />
        </EduIDButton>
      </div>
    );
  }

  // Not expired, show six input fields, a count down timer and an abort button

  return (
    <Fragment>
      <h1>
        <FormattedMessage defaultMessage="Verification of email address" description="Signup" />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage={`Enter the six digit code sent to {email} to verify your email address. You can also copy 
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
          <ResponseCodeButtons />
        </ResponseCodeForm>
      </div>
    </Fragment>
  );
}

export function ProcessEmailCode() {
  const code = useSignupAppSelector((state) => state.signup.email_code);
  const signupContext = useContext(SignupGlobalStateContext);
  const dispatch = useSignupAppDispatch();

  async function verifyCode(verification_code: string) {
    const res = await dispatch(verifyEmailRequest({ verification_code }));

    if (verifyEmailRequest.fulfilled.match(res) && res.payload.state.email.completed === true) {
      dispatch(clearNotifications());
      signupContext.signupService.send({ type: "API_SUCCESS" });
    } else {
      signupContext.signupService.send({ type: "API_FAIL" });
    }
  }

  useEffect(() => {
    if (code) {
      verifyCode(code);
    }
  }, []);

  return null;
}
