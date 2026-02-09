import { resetPasswordApi } from "apis/eduidResetPassword";
import { ResponseCodeButtons } from "components/Common/ResponseCodeAbortButton";
import { ResponseCodeForm, ResponseCodeValues } from "components/Login/ResponseCodeForm";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";

export function EmailLinkSent(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const response = useAppSelector((state) => state.resetPassword.email_response);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);
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
      document.location.href = dashboard_link;
      dispatch(resetPasswordSlice.actions.resetEmailStatus());
    }
  }

  if (!response) {
    return null;
  }

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Reset Password: Verify email address"
            description="Reset Password email link sent heading"
          />
        </h1>
        <div className="lead" />
        <p>
          <FormattedMessage
            defaultMessage="If you have an eduID account, the code has been sent to {email} from no-reply@eduid.se."
            description="Reset Password email link sent"
            values={{
              email: (
                <span>
                  <output data-testid="email-address">
                    <strong>{response?.email}</strong>.
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
            defaultMessage="If you haven't receive the code, please cancel the process and restart from the beginning."
            description="Reset Password email link sent"
          />
        </p>
      </section>
      <div className="enter-code">
        <ResponseCodeForm inputsDisabled={false} handleSubmitCode={handleSubmitCode}>
          <ResponseCodeButtons handleAbortButtonOnClick={handleAbortButtonOnClick} />
        </ResponseCodeForm>
      </div>
    </React.Fragment>
  );
}
