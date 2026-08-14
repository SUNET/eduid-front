import { resetPasswordApi } from "apis/eduidResetPassword";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import { EmailForm } from "./EmailForm";
import { ResetPasswordStepIndicator } from "./ResetPasswordStepIndicator";

export function ResetPasswordEnterEmail(): React.JSX.Element {
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const email_status = useAppSelector((state) => state.resetPassword.email_status); // Has an e-mail been sent?
  const dispatch = useAppDispatch();
  const [getResetPasswordState] = resetPasswordApi.useLazyGetResetPasswordStateQuery();

  async function onEnteredEmailAddress(email: string) {
    dispatch(clearNotifications());
    if (!email) return;
    dispatch(resetPasswordSlice.actions.setEmailAddress(email));
    getResetPasswordState();
  }

  return (
    <div className="step-container">
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Reset Password: Enter email address"
            description="ResetPasswordEnterEmail heading"
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage="If the entered address is registered, a message with instructions for resetting the password will be sent from no-reply@eduid.se."
              description="ResetPasswordEnterEmail lead text"
            />
          </p>
        </div>
      </section>

      <EmailForm
        passEmailUp={onEnteredEmailAddress}
        disabled={email_status === "requested"}
        defaultEmail={email_address}
      />
      <p>
        <FormattedMessage
          defaultMessage="Already have a code from an earlier email?"
          description="Reset Password enter code link lead"
        />
        &nbsp;
        <EduIDButton
          buttonstyle="link normal-case"
          id="reset-password-enter-code"
          onClick={() => dispatch(resetPasswordSlice.actions.setNextPage("RESET_PW_ENTER_CODE"))}
        >
          <FormattedMessage defaultMessage="Enter your code instead" description="Reset Password enter code link" />
        </EduIDButton>
      </p>
      <ResetPasswordStepIndicator currentStep={1} />
    </div>
  );
}
