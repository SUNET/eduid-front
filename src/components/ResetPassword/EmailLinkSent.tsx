import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { resetPasswordApi } from "apis/eduidResetPassword";
import { ResponseCodeButtons } from "components/Common/ResponseCodeAbortButton";
import { ResponseCodeForm, ResponseCodeValues } from "components/Login/ResponseCodeForm";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import { ResetPasswordStepIndicator } from "./ResetPasswordStepIndicator";

export function EmailLinkSent(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const response = useAppSelector((state) => state.resetPassword.email_response);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);
  const reset_pw_status = useAppSelector((state) => state.resetPassword.reset_pw_status);
  const [verifyEmailLink] = resetPasswordApi.useLazyVerifyEmailLinkQuery();

  async function handleSubmitCode(values: ResponseCodeValues) {
    const code = values.v.join("");

    const match = code.match(/^\d\d\d\d\d\d$/);
    if (match?.length == 1) {
      // match[0] is whole matched string
      const digits = match[0];

      if (digits) {
        const response = await verifyEmailLink({ email_code: digits });
        if (response.isSuccess) {
          dispatch(clearNotifications());
          if (Object.values(response.data.payload.extra_security).length > 0) {
            dispatch(resetPasswordSlice.actions.setNextPage("HANDLE_EXTRA_SECURITIES"));
          } else {
            dispatch(resetPasswordSlice.actions.setNextPage("SET_NEW_PASSWORD"));
          }
        }
      }
    }
  }

  function handleAbortButtonOnClick(event?: React.MouseEvent<HTMLButtonElement>) {
    event?.preventDefault();
    if (dashboard_link) {
      globalThis.location.href = dashboard_link;
      dispatch(resetPasswordSlice.actions.resetEmailStatus());
    }
  }

  if (!response) {
    return null;
  }

  return (
    <div className="step-container">
      <section className="intro">
        <h1>
          <FormattedMessage
            id="emailLinkSent.heading"
            defaultMessage="Reset Password: Verify email address"
            description="Reset Password email link sent heading"
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              id="common.enterSixDigitCode"
              defaultMessage="Enter the six digit code sent from no-reply@eduid.se to {email} to verify your email address."
              description="Reset Password email link sent"
              values={{
                email: (
                  <span>
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
              id="emailLinkSent.haven"
              defaultMessage="If you haven't received it, cancel and restart the process."
              description="Reset Password email link sent"
            />
          </p>
        </div>
      </section>
      {reset_pw_status?.email.expires_time_left !== undefined && (
        <p>
          <FontAwesomeIcon icon={faClock as IconProp} />
          <FormattedMessage id="emailLinkSent.code" defaultMessage="The code is valid for 2 hours." description="Reset Password code expiry" />
        </p>
      )}
      <div className="enter-code">
        <ResponseCodeForm inputsDisabled={false} handleSubmitCode={handleSubmitCode}>
          <ResponseCodeButtons handleAbortButtonOnClick={handleAbortButtonOnClick} />
        </ResponseCodeForm>
      </div>
      <ResetPasswordStepIndicator currentStep={3} />
    </div>
  );
}
