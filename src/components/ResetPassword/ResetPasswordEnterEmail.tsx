import { requestEmailLink } from "apis/eduidResetPassword";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import { EmailForm } from "./EmailForm";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

export function ResetPasswordEnterEmail(): JSX.Element {
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const email_status = useAppSelector((state) => state.resetPassword.email_status); // Has an e-mail been sent?
  const dispatch = useAppDispatch();
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  async function onEnteredEmailAddress(email: string) {
    dispatch(clearNotifications());
    if (email) {
      dispatch(resetPasswordSlice.actions.setEmailAddress(email));
      const response = await dispatch(requestEmailLink({ email }));
      if (requestEmailLink.fulfilled.match(response)) {
        resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
      } else {
        resetPasswordContext.resetPasswordService.send({ type: "API_FAIL" });
      }
    }
  }

  return (
    <React.Fragment>
      <p>
        <FormattedMessage
          defaultMessage="Enter the email address registered to your eduID account."
          description="Reset password add email heading"
        />
      </p>
      <EmailForm
        passEmailUp={onEnteredEmailAddress}
        disabled={email_status === "requested"}
        defaultEmail={email_address}
      />
    </React.Fragment>
  );
}
