import { ExpiresMeter } from "login/components/LoginApp/Login/ExpiresMeter";
import { ResponseCodeForm, ResponseCodeValues } from "login/components/LoginApp/Login/ResponseCodeForm";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSignupAppSelector } from "signup-hooks";
import { TimeRemainingWrapper } from "./TimeRemaining";

export default function SignupEnterCode(): JSX.Element {
  const signupState = useSignupAppSelector((state) => state.signup.state);
  const [isThrottled, setIsThrottled] = useState(false);

  function handleTimerReachZero() {
    setIsThrottled(true);
  }

  // have to pass a function to ResponseCodeForm in order for it to show the button
  function handleLoginButtonOnClick() {
    return undefined;
  }

  function handleAbortButtonOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    return undefined;
  }

  function handleSubmitCode(values: ResponseCodeValues) {
    const code = values.v.join("");
    const match = code.match(/^SK(\d\d\d)-(\d\d\d)$/);
    if (match?.length == 3) {
      // match[0] is whole matched string, [1] and [2] are the groups of digits
      const digits = match[1] + match[2];
    }

    return undefined;
  }

  function handleContinueWithoutCode() {
    return undefined;
  }

  return (
    <div>
      <p>Enter the code from the email</p>

      <FormattedMessage
        defaultMessage="Enter the six digit code from the email sent to {email} below"
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
      <div className="expiration-info">
        <ResponseCodeForm
          codeRequired={true}
          extra_className="enter-code"
          submitDisabled={false}
          inputsDisabled={false}
          handleLogin={handleLoginButtonOnClick}
          handleAbort={handleAbortButtonOnClick}
          handleSubmitCode={handleSubmitCode}
          handleContinueWithoutCode={handleContinueWithoutCode}
        />

        <TimeRemainingWrapper
          name="other-device-expires"
          unique_id="signup.email"
          value={signupState?.email_verification.throttle_time_left || 0}
          onReachZero={handleTimerReachZero}
        >
          <ExpiresMeter showMeter={false} expires_max={signupState?.email_verification.throttle_time_max || 0} />
        </TimeRemainingWrapper>
      </div>
    </div>
  );
}
