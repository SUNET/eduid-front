import { resetPasswordApi } from "apis/eduidResetPassword";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import { GoBackButton } from "./GoBackButton";

/**
 *
 * When we get an e-mail address from the login username page, this page asks the user for
 * confirmation before requesting the backend to send an actual e-mail to the user.
 */
export function ResetPasswordConfirmEmail(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const email_address = useAppSelector((state) => state.resetPassword.email_address);
  const [getResetPasswordState] = resetPasswordApi.useLazyGetResetPasswordStateQuery();

  function sendEmailOnClick() {
    dispatch(clearNotifications());
    if (email_address) {
      // dispatch(resetPasswordSlice.actions.setEmailAddress(email_address));
      getResetPasswordState();
    }
  }

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Reset Password: Start account recovery process"
            description="Account recovery front page heading"
          />
        </h1>
        <div className="lead" />
        <p>
          <FormattedMessage
            defaultMessage="Click the button below to send an e-mail to {email}"
            description="Account recovery front page"
            values={{
              email: (
                <span id="email_address">
                  <output data-testid="email-address">
                    <strong>{email_address}</strong>.
                  </output>
                </span>
              ),
            }}
          />
        </p>
        <p>
          <FormattedMessage
            defaultMessage="If you decide to cancel, simply click the Go Back button to return to the login page."
            description="Account recovery cancel information"
          />
        </p>
      </section>

      <div className="buttons">
        <GoBackButton />
        <EduIDButton buttonstyle="primary" type="submit" onClick={sendEmailOnClick}>
          <FormattedMessage defaultMessage="Send e-mail" description="Send e-mail button" />
        </EduIDButton>
      </div>
    </React.Fragment>
  );
}
