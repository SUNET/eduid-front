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
            id="enterEmail.heading"
            defaultMessage="Reset Password: Enter email address"
            description="ResetPasswordEnterEmail heading"
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              id="enterEmail.lead"
              defaultMessage="If the entered address is registered, a message with instructions for resetting the password will be sent from no-reply@eduid.se."
              description="ResetPasswordEnterEmail lead text"
            />
          </p>
          <p>
            <FormattedMessage
              id="enterEmail.already"
              defaultMessage="If you have already received a code, click the link below to enter it."
              description="ResetPasswordEnterEmail already have code text"
            />
          </p>
        </div>
      </section>
      <section>
        <EmailForm
          passEmailUp={onEnteredEmailAddress}
          disabled={email_status === "requested"}
          defaultEmail={email_address}
        />
        {/* <span>
            <FormattedMessage defaultMessage="Already have a code?" description="Reset Password enter code link lead" />
          </span>
          &nbsp; */}
        <div className="buttons">
          <EduIDButton
            buttonstyle="link normal-case text-large"
            id="reset-password-enter-code"
            onClick={() => dispatch(resetPasswordSlice.actions.setNextPage("RESET_PW_ENTER_CODE"))}
          >
            <FormattedMessage
              id="enterEmail.link"
              defaultMessage="Enter your code"
              description="Reset Password enter code link"
            />
          </EduIDButton>
        </div>
      </section>
      <ResetPasswordStepIndicator currentStep={1} />
    </div>
  );
}
