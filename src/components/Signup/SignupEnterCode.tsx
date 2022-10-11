import { verifyEmailRequest } from "apis/eduidSignup";
import { ExpiresMeter } from "login/components/LoginApp/Login/ExpiresMeter";
import { ResponseCodeForm, ResponseCodeValues } from "login/components/LoginApp/Login/ResponseCodeForm";
import { useContext, useState } from "react";
import { FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { useSignupAppDispatch, useSignupAppSelector } from "signup-hooks";
import EduIDButton from "components/EduIDButton";
import { SignupGlobalStateContext } from "./SignupGlobalState";
import { TimeRemainingWrapper } from "components/TimeRemaining";

interface ResponseCodeButtonsProps {
  formProps?: FormRenderProps<ResponseCodeValues>;
}

export function SignupEnterCode(): JSX.Element {
  const signupState = useSignupAppSelector((state) => state.signup.state);
  const signupContext = useContext(SignupGlobalStateContext);
  const dispatch = useSignupAppDispatch();
  const [isExpired, setIsExpired] = useState(false);

  function handleTimerReachZero() {
    setIsExpired(true);
  }

  function handleAbortButtonOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    signupContext.signupService.send({ type: "CODE_FAIL" });
  }

  async function handleSubmitCode(values: ResponseCodeValues) {
    const code = values.v.join("");

    const match = code.match(/^\d\d\d\d\d\d$/);
    if (match?.length == 1) {
      // match[0] is whole matched string
      const digits = match[0];

      if (digits) {
        signupContext.signupService.send({ type: "CODE_COMPLETE" });
        const res = await dispatch(verifyEmailRequest({ verification_code: digits }));

        if (verifyEmailRequest.fulfilled.match(res)) {
          if (res.payload.email_verification.verified === true) {
            signupContext.signupService.send({ type: "CODE_SUCCESS" });
          } else {
            signupContext.signupService.send({ type: "CODE_FAIL" });
          }
        } else {
          signupContext.signupService.send({ type: "CODE_FAIL" });
        }
      }
    }
  }

  function ResponseCodeButtons(props: ResponseCodeButtonsProps) {
    // 'convert' from FormRenderProps to a simple "disabled" boolean
    if (!props.formProps) {
      return null;
    }

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
        <FormattedMessage
          defaultMessage="The code sent to {email} has expired. Please try again."
          values={{
            email: (
              <span id="email_address">
                <output data-testid="email-address">
                  <strong>{signupState?.email_verification.email}</strong>
                </output>
              </span>
            ),
          }}
        />
        <ResponseCodeAbortButton disabled={false} />
      </div>
    );
  }

  // Not expired, show six input fields, a count down timer and an abort button

  return (
    <div>
      <p>
        <FormattedMessage
          defaultMessage="Enter the six digit code from the email sent to {email}"
          values={{
            email: (
              <span id="email_address">
                <output data-testid="email-address">
                  <strong>{signupState?.email_verification.email}</strong>
                </output>
              </span>
            ),
          }}
        />
      </p>
      <div className="enter-code">
        <ResponseCodeForm inputsDisabled={false} handleSubmitCode={handleSubmitCode}>
          <ResponseCodeButtons />
        </ResponseCodeForm>

        <TimeRemainingWrapper
          name="signup-email-expires"
          unique_id="signup.email"
          value={signupState?.email_verification.expires_time_left || 0}
          onReachZero={handleTimerReachZero}
        >
          <ExpiresMeter showMeter={false} expires_max={signupState?.email_verification.expires_time_max || 0} />
        </TimeRemainingWrapper>
      </div>
    </div>
  );
}
