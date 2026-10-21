import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginApi } from "apis/eduidLogin";
import { EduIDButton } from "components/Common/EduIDButton";
import { Splash } from "components/Common/Splash";
import { useAppSelector } from "eduid-hooks";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { FormattedMessage } from "react-intl";
import { RecoveryOptions } from "../Common/RecoveryOptions";
import { SecurityKey } from "../Common/SecurityKey";
import { LoginAbortButton } from "./LoginAbortButton";
import { LoginAtServiceInfo } from "./LoginAtServiceInfo";
import { RememberMeCheckbox } from "./NewDevice";
import { securityZoneAction, SecurityZoneInfo } from "./SecurityZoneInfo";

export function MultiFactorAuth() {
  const service_info = useAppSelector((state) => state.login.service_info);
  const authn_options = useAppSelector((state) => state.login.authn_options);
  const ref = useAppSelector((state) => state.login.ref);
  const this_device = useAppSelector((state) => state.login.this_device);
  const has_session = authn_options?.has_session;
  const [fetchMfaAuth, data] = loginApi.useLazyFetchMfaAuthQuery();
  const challengePromiseRef = useRef<Promise<
    PublicKeyCredentialRequestOptionsJSON | undefined
  > | null>(null);
  const credentialSubmissionRef = useRef<Promise<unknown> | null>(null);
  const authenticatedRef = useRef(false); // once backend reports finished, never POST /mfa_auth again from this instance
  const initialFetchStartedRef = useRef(false); // survives StrictMode effect double-invoke

  const fetchChallengeOnce = useCallback((): Promise<
    PublicKeyCredentialRequestOptionsJSON | undefined
  > => {
    if (authenticatedRef.current || !ref) return Promise.resolve(undefined);
    if (!challengePromiseRef.current) {
      challengePromiseRef.current = fetchMfaAuth({
        ref: ref,
        this_device: this_device,
      })
        .then((response) => {
          if (!response.isSuccess) return undefined;
          const { finished, webauthn_options } = response.data.payload;
          // A response that still offers options needs the assertion submitted, so don't latch then
          if (finished && !webauthn_options) authenticatedRef.current = true;
          return webauthn_options;
        })
        .finally(() => {
          // Cache only while in flight: every new attempt (after cancel/failure) gets a fresh challenge
          challengePromiseRef.current = null;
        });
    }
    return challengePromiseRef.current;
  }, [fetchMfaAuth, ref, this_device]);
  const recoveryOptions = {
    swedish_eid: authn_options.swedish_eid,
    freja_eid: authn_options.freja_eid,
    eidas: authn_options.eidas,
  };
  const show_suggestion = useMemo(() => {
    if (data.isSuccess) {
      const options = data.data.payload.webauthn_options;
      const keys = options?.allowCredentials || [];
      return (
        keys.length === 1 &&
        !authn_options.swedish_eid &&
        !authn_options.eidas &&
        !authn_options.freja_eid
      );
    }
    return false;
  }, [
    authn_options.swedish_eid,
    authn_options.eidas,
    authn_options.freja_eid,
    data?.data?.payload.webauthn_options,
    data.isSuccess,
  ]);

  let leadText;
  let headingText;

  if (
    authn_options.swedish_eid ||
    authn_options.eidas ||
    authn_options.freja_eid
  ) {
    leadText = (
      <FormattedMessage
        id="multiFactorAuth.paragraph"
        defaultMessage={`If you are unable to use the security key, please select other options below, such as BankID, Freja+, eIDAS or freja eID.`}
        description="MFA paragraph with swedish option"
      />
    );
  }

  if (securityZoneAction) {
    headingText = (
      <FormattedMessage
        id="multiFactorAuth.heading"
        defaultMessage="Re-authentication: with MFA"
        description="Security zone MFA heading"
      />
    );
  } else if (has_session) {
    headingText = (
      <FormattedMessage
        id="multiFactorAuth.mfaHeading"
        defaultMessage="Log in: with MFA"
        description="Login MFA heading"
      />
    );
  } else {
    headingText = (
      <FormattedMessage
        id="multiFactorAuth.title"
        defaultMessage="Welcome, {username}!"
        description="start main title"
        values={{
          username: <strong>{authn_options.display_name}</strong>,
        }}
      />
    );
  }

  const isLoaded = data.isSuccess;
  const hasMfaOptions =
    authn_options.swedish_eid ||
    authn_options.webauthn ||
    authn_options.eidas ||
    authn_options.freja_eid;

  useEffect(() => {
    if (!ref || initialFetchStartedRef.current) return;
    initialFetchStartedRef.current = true;
    // Always call the MFA auth endpoint to get the current MFA state:
    //
    // If webauthn is an available choice for this user, fetch a challenge
    // from the backend if we don't have one already.
    //
    // If returning from external authentication with Sweden Connect, we need
    // to call the MFA endpoint for it to complete.
    fetchChallengeOnce();
  }, [fetchChallengeOnce, ref]);

  async function getChallenge() {
    if (credentialSubmissionRef.current) {
      await credentialSubmissionRef.current.catch(() => {});
      credentialSubmissionRef.current = null;
    }
    return fetchChallengeOnce();
  }

  async function useCredential(
    credential: AuthenticationResponseJSON,
  ): Promise<boolean> {
    if (!ref || authenticatedRef.current) return authenticatedRef.current;
    const promise = fetchMfaAuth({
      ref: ref,
      this_device: this_device,
      webauthn_response: credential,
    });
    credentialSubmissionRef.current = promise;
    const response = await promise;
    if (response.isSuccess && response.data.payload.finished)
      authenticatedRef.current = true;
    return authenticatedRef.current;
  }

  return (
    <>
      <section className="intro">
        <h1>{headingText}</h1>
        <div className="lead">
          <LoginAtServiceInfo service_info={service_info} />
        </div>
        <SecurityZoneInfo />
      </section>

      <Splash showChildren={isLoaded}>
        {hasMfaOptions ? (
          <>
            <p>
              <FormattedMessage
                id="multiFactorAuth.mfaParagraph"
                defaultMessage={`Choose a second method to authenticate yourself, ensuring only you can access your eduID. `}
                description="MFA paragraph"
              />
              &nbsp;
              {leadText}
            </p>
            <div className="options">
              <SecurityKey
                disabled={!authn_options?.webauthn}
                setup={getChallenge}
                onSuccess={useCredential}
              />
              {show_suggestion && (
                <span className="suggestion suggestion-txt">
                  <FormattedMessage
                    id="multiFactorAuth.multiple"
                    description="multiple key suggestion"
                    defaultMessage="It is strongly recommended to {strong} security key or passkey to ensure you can still log in to your account if one is lost."
                    values={{
                      strong: (
                        <strong>
                          <FormattedMessage
                            id="multiFactorAuth.multipleKey"
                            description="multiple key - strong"
                            defaultMessage={`add more than one`}
                          />
                        </strong>
                      ),
                    }}
                  />
                </span>
              )}
              <RecoveryOptions recoveryAvailable={recoveryOptions} />
            </div>
            <RememberMeCheckbox />
          </>
        ) : (
          <ExtraSecurityNotAvailable />
        )}
      </Splash>
    </>
  );
}

function ExtraSecurityNotAvailable() {
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);

  const goToDashboard = () => {
    if (dashboard_link) {
      document.location.href = dashboard_link;
    }
  };

  return (
    <section>
      <div className="status-box m-b-md">
        <div className="checkbox-wrapper">
          <FontAwesomeIcon icon={faCircleExclamation} className="disabled" />
        </div>
        <div className="text-wrapper">
          <p>
            <FormattedMessage
              id="multiFactorAuth.serviceRequires"
              defaultMessage={`The service you are trying to log in to requires an extra level of security.
                           Unfortunately, your eduID account isn't set up with any of the options available
                           for that.
                     `}
              description="Login MFA"
            />
          </p>
        </div>
      </div>

      <h2>
        <FormattedMessage
          id="multiFactorAuth.optionsHeading"
          defaultMessage="Options available in the eduID settings:"
          description="Login MFA"
        />
      </h2>

      <ul className="bullets">
        <li>
          <FormattedMessage
            id="multiFactorAuth.addKeyInfo"
            defaultMessage={`Add a Security Key to your account. This can be a physical USB key or a device such as
                 a smartphone or tablet that supports the WebAuthn standard. Some computers also have built-in
                 fingerprint readers that can be used as a Security Key.`}
            description="Login MFA"
          />
        </li>

        <li>
          <FormattedMessage
            id="multiFactorAuth.verifyInfo"
            defaultMessage={`Verify your identity using the options applicable to you.`}
            description="Login MFA"
          />
        </li>
      </ul>
      <div className="buttons-center">
        {!securityZoneAction && <LoginAbortButton />}
        <EduIDButton
          id="to-eduid-link"
          buttonstyle="link normal-case"
          onClick={goToDashboard}
        >
          <FormattedMessage
            id="common.goToEduid"
            defaultMessage="go to eduID"
            description="Login MFA link"
          />
        </EduIDButton>
      </div>
    </section>
  );
}
