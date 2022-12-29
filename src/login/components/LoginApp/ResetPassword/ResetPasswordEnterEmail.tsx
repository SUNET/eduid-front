import { requestEmailLink } from "apis/eduidResetPassword";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "reducers/Notifications";
import { EmailForm } from "./EmailForm";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

export function ResetPasswordEnterEmail(): JSX.Element {
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const email_status = useAppSelector((state) => state.resetPassword.email_status); // Has an e-mail been sent?
  const dispatch = useAppDispatch();
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  function onEnteredEmailAddress(email: string) {
    dispatch(clearNotifications());
    dispatch(resetPasswordSlice.actions.setEmailAddress(email));
    dispatch(requestEmailLink({ email }));
    resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
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
