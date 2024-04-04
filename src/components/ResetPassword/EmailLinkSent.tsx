import { verifyEmailLink } from "apis/eduidResetPassword";
import { ResponseCodeButtons } from "components/Common/ResponseCodeAbortButton";
import { ResponseCodeForm, ResponseCodeValues } from "components/Login/ResponseCodeForm";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

export function EmailLinkSent(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const response = useAppSelector((state) => state.resetPassword.email_response);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);

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

  function handleAbortButtonOnClick() {
    if (dashboard_link) {
      document.location.href = dashboard_link;
      dispatch(resetPasswordSlice.actions.resetEmailStatus());
      resetPasswordContext.resetPasswordService.send({ type: "GO_BACK" });
    }
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
          defaultMessage="If you haven't receive the email code, please cancel the process and restart from the beginning."
          description="Reset Password email link sent"
        />
      </p>
      <div className="enter-code">
        <ResponseCodeForm inputsDisabled={false} handleSubmitCode={handleSubmitCode}>
          <ResponseCodeButtons handleAbortButtonOnClick={handleAbortButtonOnClick} />
        </ResponseCodeForm>
      </div>
    </React.Fragment>
  );
}
