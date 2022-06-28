import { requestEmailLink } from "apis/eduidResetPassword";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useAppDispatch } from "../../../app_init/hooks";
import EmailForm from "./EmailForm";

export function ResetPasswordEnterEmail(): JSX.Element {
  const dispatch = useAppDispatch();

  function onEnteredEmailAddress(email: string) {
    dispatch(requestEmailLink({ email }));
  }

  return (
    <React.Fragment>
      <p className="heading">
        <FormattedMessage
          defaultMessage="Enter the email address registered to your eduID account."
          description="Reset password add email heading"
        />
      </p>
      <EmailForm passEmailUp={onEnteredEmailAddress} />
    </React.Fragment>
  );
}
