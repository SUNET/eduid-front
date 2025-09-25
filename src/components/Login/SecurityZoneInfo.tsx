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
    <a href={SECURITY_PATH} aria-label="return to security page">
      <FormattedMessage description="security zone security link" defaultMessage="Security" />
    </a>
  );

  const toAccount = (
    <a href={ACCOUNT_PATH} aria-label="return to account page">
      <FormattedMessage description="security zone account link" defaultMessage="Account" />
    </a>
  );

  const toIdentity = (
    <a href={IDENTITY_PATH} aria-label="return to identity page">
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
      {!securityZoneAction ? null : (
        <div className="status-box">
          <div className="checkbox-wrapper">
            <FontAwesomeIcon icon={faCircleExclamation} className="disabled" />
          </div>
          <div className="text-wrapper">
            <h3>
              <FormattedMessage defaultMessage={`Authenticate to continue`} description="security zone redirect info" />
            </h3>
            <span>
              <FormattedMessage
                defaultMessage={`Afterward, you'll return to the page to {action} or you can cancel and return to {page}`}
                description="security zone redirect info"
                values={{
                  action: current?.action,
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
