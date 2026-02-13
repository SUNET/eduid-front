import EduIDButton from "components/Common/EduIDButton";
import { RecoveryOptions } from "components/Common/RecoveryOptions";
import { SecurityKey as SecurityKeyLogin } from "components/Common/SecurityKey";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";

/**
 * Render the extra security options, security key, Freja eID and phone verification
 */
export function HandleExtraSecurities(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const extra_security = useAppSelector((state) => state.resetPassword.extra_security);

  useEffect(() => {
    if (extra_security && !Object.values(extra_security).length) {
      dispatch(resetPasswordSlice.actions.setNextPage("SET_NEW_PASSWORD"));
    }
  }, [dispatch, extra_security]);

  function continueSetPassword() {
    dispatch(resetPasswordSlice.actions.selectExtraSecurity("without"));
    dispatch(clearNotifications());
    dispatch(resetPasswordSlice.actions.setNextPage("SET_NEW_PASSWORD"));
  }

  if (!extra_security) {
    return null;
  }

  async function setupSecurityKey() {
    if (!extra_security?.tokens?.webauthn_options) return;
    dispatch(resetPasswordSlice.actions.selectExtraSecurity("securityKey"));
    return extra_security.tokens.webauthn_options;
  }

  function continueWithSecurityKey() {
    dispatch(resetPasswordSlice.actions.setNextPage("SET_NEW_PASSWORD"));
  }

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Reset Password: Verification method"
            description="HandleExtraSecurities heading"
          />
        </h1>
        <div className="lead" />
        <p>
          {Object.keys(extra_security).length > 0 ? (
            <FormattedMessage
              defaultMessage={`Choose a second method to authenticate yourself, ensuring only you can access your eduID. If you are unable to use the security key, please select other options below, such as BankID or Freja+.`}
              description="MFA paragraph with swedish option"
            />
          ) : (
            <FormattedMessage
              defaultMessage={`Choose a second method to authenticate yourself, ensuring only you can access your eduID. `}
              description="MFA paragraph"
            />
          )}
        </p>
      </section>
      <div className="options">
        {extra_security.tokens !== undefined && (
          <SecurityKeyLogin setup={setupSecurityKey} onSuccess={continueWithSecurityKey} />
        )}
        <RecoveryOptions recoveryAvailable={extra_security} />
      </div>
      <h3 className="description-without-security">
        <FormattedMessage
          description="without extra security heading"
          defaultMessage="Continue without MFA authentication"
        />
      </h3>
      <p>
        <FormattedMessage
          description="without extra security description"
          defaultMessage="Your account will require confirmation after the password has been reset."
        />
        &nbsp;
        <EduIDButton buttonstyle="link lowercase" id="continue-without-security" onClick={continueSetPassword}>
          <FormattedMessage description="continue reset password" defaultMessage="Continue reset password" />
        </EduIDButton>
      </p>
    </React.Fragment>
  );
}
