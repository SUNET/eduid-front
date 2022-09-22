import { requestEmailLink } from "apis/eduidResetPassword";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "reducers/Notifications";
import EmailForm from "./EmailForm";

export function ResetPasswordEnterEmail(): JSX.Element {
  const email_status = useAppSelector((state) => state.resetPassword.email_status); // Has an e-mail been sent?
  const dispatch = useAppDispatch();

  function onEnteredEmailAddress(email: string) {
    dispatch(clearNotifications());
    dispatch(requestEmailLink({ email }));
  }

  return (
    <React.Fragment>
      <p>
        <FormattedMessage
          defaultMessage="Enter the email address registered to your eduID account."
          description="Reset password add email heading"
        />
      </p>
      <EmailForm passEmailUp={onEnteredEmailAddress} disabled={email_status === "requested"} />
    </React.Fragment>
  );
}
