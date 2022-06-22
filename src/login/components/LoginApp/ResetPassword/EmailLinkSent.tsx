import EduIDButton from "components/EduIDButton";
import { TimeRemainingWrapper } from "components/TimeRemaining";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import { ExpiresMeter } from "../Login/ExpiresMeter";
import { GoBackButton } from "./GoBackButton";

interface EmailLinkSentProps {
  expires_in: number;
  expires_max: number;
}

export function EmailLinkSent(props: EmailLinkSentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const [resendDisabled, setResendDisabled] = useState(true);

  /**
   * The user has clicked the button to request that another e-mail should be sent.
   */
  const sendEmailOnClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (email_address) {
      dispatch(resetPasswordSlice.actions.requestEmailLink(email_address));
      // TODO: update backend to provide timeout in response
      dispatch(resetPasswordSlice.actions.saveEmailThrottledSeconds(5 * 60));
    }
    setResendDisabled(true); // disabled button again on use
  };

  function handleTimerReachZero() {
    setResendDisabled(false); // allow user to request a new e-mail when timer expires
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
                  <strong>{email_address}</strong>
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
      <div className="timer">
        <TimeRemainingWrapper
          name="reset-password-email-expires"
          unique_id={email_address}
          value={props.expires_in}
          onReachZero={handleTimerReachZero}
        >
          <ExpiresMeter showMeter={false} expires_max={props.expires_max} />

          <div className="button-pair">
            <EduIDButton
              buttonstyle="primary"
              type="submit"
              className="settings-button"
              id="send-email-button"
              onClick={sendEmailOnClick}
              disabled={resendDisabled}
            >
              <FormattedMessage defaultMessage="Resend e-mail" description="Resend e-mail button" />
            </EduIDButton>
            <GoBackButton primary={true} />
          </div>
        </TimeRemainingWrapper>
      </div>
    </React.Fragment>
  );
}
