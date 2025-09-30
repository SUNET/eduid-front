import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FRONTEND_ACTION } from "components/Common/MultiFactorAuthentication";
import { ACCOUNT_PATH, IDENTITY_PATH, SECURITY_PATH } from "components/IndexMain";
import React, { Fragment, ReactElement } from "react";
import { FormattedMessage } from "react-intl";
export const securityZoneAction = sessionStorage.getItem(FRONTEND_ACTION);

type SecurityZoneAction =
  | "changeSecurityPreferencesAuthn"
  | "addSecurityKeyAuthn"
  | "terminateAccountAuthn"
  | "changepwAuthn"
  | "removeIdentity"
  | "removeSecurityKeyAuthn"
  | "verifyCredential";

interface ActionInfo {
  action: string;
  redirectPath: ReactElement;
}

export function SecurityZoneInfo(): React.JSX.Element {
  const toSecurity = (
    <a href={SECURITY_PATH} aria-label="return to security page" onClick={() => sessionStorage.clear()}>
      <FormattedMessage description="security zone security link" defaultMessage="Security" />
    </a>
  );

  const toAccount = (
    <a href={ACCOUNT_PATH} aria-label="return to account page" onClick={() => sessionStorage.clear()}>
      <FormattedMessage description="security zone account link" defaultMessage="Account" />
    </a>
  );

  const toIdentity = (
    <a href={IDENTITY_PATH} aria-label="return to identity page" onClick={() => sessionStorage.clear()}>
      <FormattedMessage description="security zone identity link" defaultMessage="Identity" />
    </a>
  );

  const actionMap: Record<SecurityZoneAction, ActionInfo> = {
    changeSecurityPreferencesAuthn: {
      action: "change security key preferences",
      redirectPath: toSecurity,
    },
    addSecurityKeyAuthn: {
      action: "add security key",
      redirectPath: toSecurity,
    },
    removeSecurityKeyAuthn: {
      action: "remove security key",
      redirectPath: toSecurity,
    },
    verifyCredential: {
      action: "verify security key",
      redirectPath: toSecurity,
    },
    terminateAccountAuthn: {
      action: "delete account",
      redirectPath: toAccount,
    },
    changepwAuthn: {
      action: "change password",
      redirectPath: toAccount,
    },
    removeIdentity: {
      action: "remove identity",
      redirectPath: toIdentity,
    },
  };

  const current = securityZoneAction ? actionMap[securityZoneAction as SecurityZoneAction] : undefined;

  return (
    <Fragment>
      {securityZoneAction && (
        <div className="status-box">
          <div className="checkbox-wrapper">
            <FontAwesomeIcon icon={faCircleExclamation} className="disabled" />
          </div>
          <div className="text-wrapper">
            <h3>
              <FormattedMessage defaultMessage={`Authenticate to continue`} description="security zone redirect info" />
            </h3>
            <p>
              <FormattedMessage
                defaultMessage={`Afterward, you will be redirected to the page to {action}.`}
                description="security zone redirect info"
                values={{
                  action: current?.action,
                }}
              />
            </p>
            <span className="help-text">
              <FormattedMessage
                defaultMessage={`If you wish to cancel this process without affecting a change you can return straight to {page} page.`}
                description="security zone cancel info"
                values={{
                  page: current?.redirectPath,
                }}
              />
            </span>
          </div>
        </div>
      )}
    </Fragment>
  );
}
