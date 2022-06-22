import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import EmailForm from "./EmailForm";

export function ResetPasswordEnterEmail(): JSX.Element {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.notifications.error);

  useEffect(() => {
    if (error) {
      // TODO: it says 'phone' here, even though we're doing e-mail stuff?

      // error message is expired-phone-code
      if (error.message.match("resetpw.expired-phone-code")) {
        // dispatch useLinkCode to change path to extra-security for resending sms code
        dispatch(resetPasswordSlice.actions.useLinkCode());
      }
    }
  }, [error]);

  function onEnteredEmailAddress(email: string) {
    dispatch(resetPasswordSlice.actions.requestEmailLink(email));
    // TODO: update backend to provide timeout in response
    dispatch(resetPasswordSlice.actions.saveEmailThrottledSeconds(5 * 60));
  }

  return (
    <React.Fragment>
      <p className="heading">
        <FormattedMessage
          defaultMessage="Enter the email address registered to your eduID account"
          description="Reset password add email heading"
        />
      </p>
      <EmailForm passEmailUp={onEnteredEmailAddress} />
    </React.Fragment>
  );
}
