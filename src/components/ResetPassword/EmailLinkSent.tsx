import { requestEmailLink, verifyEmailLink } from "apis/eduidResetPassword";
import EduIDButton from "components/Common/EduIDButton";
import { TimeRemainingWrapper } from "components/Common/TimeRemaining";
import { ResponseCodeForm, ResponseCodeValues } from "components/Login/ResponseCodeForm";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useContext, useState } from "react";
import { FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { ExpiresMeter } from "../Login/ExpiresMeter";
import { GoBackButton } from "./GoBackButton";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

interface ResponseCodeButtonsProps {
  formProps?: FormRenderProps<ResponseCodeValues>;
}

export function EmailLinkSent(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const [resendDisabled, setResendDisabled] = useState(true);
  const response = useAppSelector((state) => state.resetPassword.email_response);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  async function handleSubmitCode(values: ResponseCodeValues) {
    const code = values.v.join("");

    const match = code.match(/^\d\d\d\d\d\d$/);
    if (match?.length == 1) {
      // match[0] is whole matched string
      const digits = match[0];

      if (digits) {
        // dispatch(signupSlice.actions.setEmailCode(digits));
        const response = await dispatch(verifyEmailLink({ email_code: digits }));
        if (verifyEmailLink.fulfilled.match(response)) {
          dispatch(clearNotifications());
          resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
        } else {
          resetPasswordContext.resetPasswordService.send({ type: "API_FAIL" });
        }
      }
    }
  }

  function handleAbortButtonOnClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    resetPasswordContext.resetPasswordService.send({ type: "GO_BACK" });
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

  /**
   * The user has clicked the button to request that another e-mail should be sent.
   */
  function sendEmailOnClick(e: React.MouseEvent<HTMLElement>) {
    (async () => {
      e.preventDefault();
      if (response?.email) {
        try {
          const resp = await dispatch(requestEmailLink({ email: response.email }));
          if (requestEmailLink.rejected.match(resp)) {
            resetPasswordContext.resetPasswordService.send({ type: "API_FAIL" });
          }
        } catch (error) {}
      }
      setResendDisabled(true); // disabled button again on use
    })();
  }

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
          defaultMessage="If you have an eduID account, the code has been sent to {email}."
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
          defaultMessage="The email code is valid for two hours."
          description="Reset Password email link sent"
        />
      </p>
      <p>
        <FormattedMessage
          defaultMessage="If you haven't receive the email code, you can resend it after five minutes, according to the timer next to the Resend button."
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
          <FormattedMessage defaultMessage="Resend email code" description="Resend email code button" />
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
      <div className="enter-code">
        <ResponseCodeForm inputsDisabled={false} handleSubmitCode={handleSubmitCode}>
          <ResponseCodeButtons />
        </ResponseCodeForm>
      </div>
    </React.Fragment>
  );
}
