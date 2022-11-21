import { requestEmailLink } from "apis/eduidResetPassword";
import EduIDButton from "components/EduIDButton";
import { TimeRemainingWrapper } from "components/TimeRemaining";
import React, { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import { ExpiresMeter } from "../Login/ExpiresMeter";
import { GoBackButton } from "./GoBackButton";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

export function EmailLinkSent(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const [resendDisabled, setResendDisabled] = useState(true);
  const response = useAppSelector((state) => state.resetPassword.email_response);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  /**
   * The user has clicked the button to request that another e-mail should be sent.
   */
  const sendEmailOnClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (response?.email) {
      dispatch(requestEmailLink({ email: response.email }));
      resetPasswordContext.resetPasswordService.send({ type: "COMPLETE" });
    }
    setResendDisabled(true); // disabled button again on use
  };

  function handleTimerReachZero() {
    setResendDisabled(false); // allow user to request a new e-mail when timer expires
  }

  if (!response) {
    return null;
  }

  return (
    <React.Fragment>
      <p>
        <FormattedMessage
          defaultMessage="An e-mail with instructions has been sent to {email}."
          description="Reset Password email link sent"
          values={{
            email: (
              <span id="email_address">
                <output data-testid="email-address">
                  <strong>{response?.email}</strong>
                </output>
              </span>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="The link in the e-mail is valid for two hours."
          description="Reset Password email link sent"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="If you didn’t receive the email, check your junk email, or resend the email."
          description="Reset Password email link sent"
        />
      </p>

      <div className="buttons">
        <GoBackButton />
        <EduIDButton
          buttonstyle="primary"
          type="submit"
          id="send-email-button"
          onClick={sendEmailOnClick}
          disabled={resendDisabled}
        >
          <FormattedMessage defaultMessage="Resend e-mail" description="Resend e-mail button" />
        </EduIDButton>
        <TimeRemainingWrapper
          name="reset-password-email-expires"
          unique_id={response?.email}
          value={response?.throttled_seconds}
          onReachZero={handleTimerReachZero}
        >
          <ExpiresMeter showMeter={false} expires_max={response?.throttled_max} />
        </TimeRemainingWrapper>
      </div>
    </React.Fragment>
  );
}
