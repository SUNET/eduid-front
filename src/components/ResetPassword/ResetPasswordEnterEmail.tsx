import { resetPasswordApi } from "apis/eduidResetPassword";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import { EmailForm } from "./EmailForm";
// import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

export function ResetPasswordEnterEmail(): React.JSX.Element {
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const email_status = useAppSelector((state) => state.resetPassword.email_status); // Has an e-mail been sent?
  const dispatch = useAppDispatch();
  const [getResetPasswordState] = resetPasswordApi.useLazyGetResetPasswordStateQuery();
  // const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  async function onEnteredEmailAddress(email: string) {
    dispatch(clearNotifications());
    if (email) {
      dispatch(resetPasswordSlice.actions.setEmailAddress(email));
      getResetPasswordState();
      dispatch(resetPasswordSlice.actions.setNextPage("ResetPasswordCaptcha"));
      // setCurrentPage("ResetPasswordCaptcha");
      // resetPasswordContext.resetPasswordService.send({ type: "COMPLETE" });
    }
  }

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Reset Password: Enter the email address"
            description="ResetPasswordEnterEmail heading"
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage="Once entered, if the address is registered, a message with instructions to reset the password will be sent from no-reply@eduid.se."
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
    </React.Fragment>
  );
}
