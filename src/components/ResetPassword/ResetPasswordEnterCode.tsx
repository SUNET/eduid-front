import { resetPasswordApi } from "apis/eduidResetPassword";
import EmailInput from "components/Common/EmailInput";
import { ResponseCodeButtons } from "components/Common/ResponseCodeAbortButton";
import { ResponseCodeForm, ResponseCodeValues } from "components/Login/ResponseCodeForm";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import { ResetPasswordStepIndicator } from "./ResetPasswordStepIndicator";

/**
 * Enter the emailed code on a browser that did not start the reset process.
 *
 * The code is resolved from the eppn in the session, so a browser with no identity hint has to
 * send the email address along with the code. This is also where the user is sent when a session
 * turns out not to have completed the code step.
 */
export function ResetPasswordEnterCode(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);
  const [verifyEmailLink] = resetPasswordApi.useLazyVerifyEmailLinkQuery();

  async function handleSubmitCode(values: ResponseCodeValues) {
    const email_code = values.v.join("");
    const email = values.email ?? email_address;

    if (!email) {
      return;
    }

    const response = await verifyEmailLink({ email_code, email });
    if (response.isSuccess) {
      dispatch(clearNotifications());
      if (Object.values(response.data.payload.extra_security).length > 0) {
        dispatch(resetPasswordSlice.actions.setNextPage("HANDLE_EXTRA_SECURITIES"));
      } else {
        dispatch(resetPasswordSlice.actions.setNextPage("SET_NEW_PASSWORD"));
      }
    }
  }

  function handleAbortButtonOnClick(event?: React.MouseEvent<HTMLButtonElement>) {
    event?.preventDefault();
    if (dashboard_link) {
      globalThis.location.href = dashboard_link;
    }
  }

  return (
    <div className="step-container">
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Reset Password: Enter your code"
            description="Reset Password enter code heading"
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage="Enter the email address that the code was sent to, and the code from the email."
              description="Reset Password enter code lead"
            />
          </p>
        </div>
      </section>

      <div className="enter-code">
        <ResponseCodeForm
          inputsDisabled={false}
          autoFocusCode={false}
          extraFields={
            <EmailInput
              name="email"
              required={true}
              autoFocus={true}
              autoComplete="username"
              defaultValue={email_address}
            />
          }
          handleSubmitCode={handleSubmitCode}
        >
          <ResponseCodeButtons handleAbortButtonOnClick={handleAbortButtonOnClick} requireEmail={true} />
        </ResponseCodeForm>
      </div>
      <ResetPasswordStepIndicator currentStep={3} />
    </div>
  );
}
