import { loginApi } from "apis/eduidLogin";
import Splash from "components/Common/Splash";
import { useAppSelector } from "eduid-hooks";
import React, { Fragment, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { SecurityKey } from "../Common/SecurityKey";
import { SwedishEID } from "../Common/SwedishEID";
import { LoginAbortButton } from "./LoginAbortButton";
import { LoginAtServiceInfo } from "./LoginAtServiceInfo";
import { securityZoneAction, SecurityZoneInfo } from "./SecurityZoneInfo";

export function MultiFactorAuth(): React.JSX.Element {
  const service_info = useAppSelector((state) => state.login.service_info);
  const authn_options = useAppSelector((state) => state.login.authn_options);
  const mfa = useAppSelector((state) => state.login.mfa);
  const ref = useAppSelector((state) => state.login.ref);
  const this_device = useAppSelector((state) => state.login.this_device);
  const has_session = authn_options?.has_session;
  const [fetchMfaAuth] = loginApi.useLazyFetchMfaAuthQuery();

  let leadText;
  let headingText;

  if (authn_options.swedish_eid) {
    leadText = (
      <FormattedMessage
        defaultMessage={`If you are unable to use the security key, please select other options below, such as BankID or Freja+.`}
        description="MFA paragraph with swedish option"
      />
    );
  }

  if (securityZoneAction) {
    headingText = (
      <FormattedMessage defaultMessage="Re-authentication: with MFA" description="Security zone MFA heading" />
    );
  } else if (has_session) {
    headingText = <FormattedMessage defaultMessage="Log in: with MFA" description="Login MFA heading" />;
  } else {
    headingText = (
      <FormattedMessage
        defaultMessage="Welcome, {username}!"
        description="start main title"
        values={{
          username: <strong>{authn_options.display_name}</strong>,
        }}
      />
    );
  }

  const isLoaded = mfa?.state === "loaded";
  const hasMfaOptions = authn_options.swedish_eid || authn_options.webauthn;

  useEffect(() => {
    if (ref && mfa?.state === undefined) {
      // Always call the MFA auth endpoint to get the current MFA state:
      //
      // If webauthn is an available choice for this user, fetch a challenge
      // from the backend if we don't have one already.
      //
      // If returning from external authentication with Sweden Connect, we need
      // to call the MFA endpoint for it to complete.
      fetchMfaAuth({ ref: ref, this_device: this_device });
    }
  }, [mfa]);

  async function getChallenge() {
    if (ref) {
      const response = await fetchMfaAuth({ ref: ref, this_device: this_device });
      if (response.isSuccess) {
        return response.data.payload.webauthn_options;
      }
    }
  }

  function useCredential(credential: PublicKeyCredentialJSON) {
    if (ref) {
      fetchMfaAuth({ ref: ref, this_device: this_device, webauthn_response: credential });
    }
  }

  return (
    <Fragment>
      <section className="intro">
        <h1>{headingText}</h1>
        <div className="lead">
          <LoginAtServiceInfo service_info={service_info} />
        </div>
        <SecurityZoneInfo />
      </section>

      <Splash showChildren={isLoaded}>
        {hasMfaOptions ? (
          <React.Fragment>
            <p>
              <FormattedMessage
                defaultMessage={`Choose a second method to authenticate yourself, ensuring only you can access your eduID. `}
                description="MFA paragraph"
              />
              &nbsp;
              {leadText}
            </p>
            <div className="options">
              <SecurityKey disabled={!authn_options?.webauthn} setup={getChallenge} onSuccess={useCredential} />
              <SwedishEID recoveryAvailable={authn_options.swedish_eid} />
            </div>
          </React.Fragment>
        ) : (
          <ExtraSecurityNotAvailable />
        )}
      </Splash>
    </Fragment>
  );
}

function ExtraSecurityNotAvailable(): React.JSX.Element {
  const toDashboard = useAppSelector((state) => state.config.dashboard_link);

  return (
    <article>
      <p>
        <FormattedMessage
          defaultMessage={`The service you are trying to log in to requires an extra level of security.
                           Unfortunately, your eduID account isn't set up with any of the options available
                           for that.
                     `}
          description="Login MFA"
        />
      </p>
      <p>
        <dl className="terms">
          <dt>
            <FormattedMessage defaultMessage="Options available in the eduID Dashboard:" description="Login MFA" />
          </dt>
          <dd>
            <FormattedMessage
              defaultMessage={`Add a Security Key to your account. This can be a physical USB key or a device such as
                 a smartphone or tablet that supports the WebAuthn standard. Some computers also have built-in
                 fingerprint readers that can be used as a Security Key.`}
              description="Login MFA"
            />
          </dd>

          <dd>
            <FormattedMessage
              defaultMessage={`If you have a Swedish national identity number and Freja eID+,
                                             confirm your identity and you'll be able to use Freja eID+ to log in.`}
              description="Login MFA"
            />
          </dd>
        </dl>
      </p>
      {!securityZoneAction && <LoginAbortButton />}
      {toDashboard && (
        <div className="links">
          <div className="text-small">
            <a href={toDashboard}>
              <FormattedMessage defaultMessage="go to eduID Dashboard" description="Login MFA link" />
            </a>
          </div>
        </div>
      )}
    </article>
  );
}
