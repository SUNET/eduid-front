import { fetchMfaAuth } from "apis/eduidLogin";
import Splash from "components/Common/Splash";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { Fragment, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { LoginAbortButton } from "./LoginAbortButton";
import { LoginAtServiceInfo } from "./LoginAtServiceInfo";
import { SecurityKey } from "./SecurityKey";
import { SwedishEID } from "./SwedishEID";

export function MultiFactorAuth(): JSX.Element {
  const dispatch = useAppDispatch();
  const service_info = useAppSelector((state) => state.login.service_info);
  const authn_options = useAppSelector((state) => state.login.authn_options);
  const mfa = useAppSelector((state) => state.login.mfa);
  const ref = useAppSelector((state) => state.login.ref);

  const isLoaded = mfa?.state === "loaded";
  //TODO: when backend is updated to swedish_eid, we should be able to rename this.
  const hasMfaOptions = authn_options.freja_eidplus || authn_options.webauthn;

  useEffect(() => {
    if (ref && mfa?.state === undefined) {
      // Always call the MFA auth endpoint to get the current MFA state:
      //
      // If webauthn is an available choice for this user, fetch a challenge
      // from the backend if we don't have one already.
      //
      // If returning from external authentication with Sweden Connect, we need
      // to call the MFA endpoint for it to complete.
      dispatch(fetchMfaAuth({ ref: ref }));
    }
  }, [authn_options, mfa]);

  return (
    <Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage defaultMessage="Log in: Extra level of security" description="Login MFA heading" />
        </h1>
        <div className="lead">
          <LoginAtServiceInfo service_info={service_info} />
        </div>
      </section>
      <Splash showChildren={isLoaded}>
        {hasMfaOptions ? (
          <React.Fragment>
            <p>
              <FormattedMessage
                defaultMessage={`You need to choose a second method to authenticate yourself.
                           This helps guarantee that only you can access your eduID.`}
                description="Login MFA paragraph"
              />
            </p>
            <div className="options">
              <SecurityKey />
              <SwedishEID />
            </div>
          </React.Fragment>
        ) : (
          <ExtraSecurityNotAvailable />
        )}
      </Splash>
    </Fragment>
  );
}

function ExtraSecurityNotAvailable(): JSX.Element {
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
        <dl tabIndex={0} className="terms">
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
      <LoginAbortButton />
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
