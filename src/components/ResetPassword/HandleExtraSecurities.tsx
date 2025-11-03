import EduIDButton from "components/Common/EduIDButton";
import { SecurityKey as SecurityKeyLogin } from "components/Common/SecurityKey";
import { SwedishEID } from "components/Common/SwedishEID";
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
  const swedishEID_status = useAppSelector((state) => state.resetPassword.swedishEID_status);

  useEffect(() => {
    if (swedishEID_status === "eidas.mfa_authn_success" || swedishEID_status === "bankid.mfa_authn_success") {
      dispatch(resetPasswordSlice.actions.selectExtraSecurity("swedishEID"));
      dispatch(resetPasswordSlice.actions.setNextPage("SET_NEW_PASSWORD"));
    }
  }, [dispatch, swedishEID_status]);

  useEffect(() => {
    if (
      (extra_security && !Object.values(extra_security).length) ||
      (extra_security?.tokens === undefined && !extra_security?.external_mfa)
    ) {
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
    if (extra_security?.tokens?.webauthn_options) {
      dispatch(resetPasswordSlice.actions.selectExtraSecurity("securityKey"));
      return extra_security.tokens.webauthn_options;
    }
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
          {extra_security.external_mfa ? (
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
        <SwedishEID recoveryAvailable={extra_security.external_mfa} />
      </div>
      <h3 className="description-without-security">
        <FormattedMessage
          description="without extra security heading"
          defaultMessage="Continue without security option"
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
