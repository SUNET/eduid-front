import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FRONTEND_ACTION } from "components/Common/MultiFactorAuthentication";
import { ACCOUNT_PATH, IDENTITY_PATH, SECURITY_PATH } from "components/IndexMain";
import React, { Fragment, ReactElement } from "react";
import { FormattedMessage, useIntl } from "react-intl";

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
  const intl = useIntl();

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
      action: intl.formatMessage({
        id: "security key prefs action",
        defaultMessage: "change security key preferences",
      }),
      redirectPath: toSecurity,
    },
    addSecurityKeyAuthn: {
      action: intl.formatMessage({
        id: "add security key action",
        defaultMessage: "add security key",
      }),
      redirectPath: toSecurity,
    },
    removeSecurityKeyAuthn: {
      action: intl.formatMessage({
        id: "remove security key action",
        defaultMessage: "remove security key",
      }),
      redirectPath: toSecurity,
    },
    verifyCredential: {
      action: intl.formatMessage({
        id: "verity security key action",
        defaultMessage: "verify security key",
      }),
      redirectPath: toSecurity,
    },
    terminateAccountAuthn: {
      action: intl.formatMessage({
        id: "delete account action",
        defaultMessage: "delete account",
      }),
      redirectPath: toAccount,
    },
    changepwAuthn: {
      action: intl.formatMessage({
        id: "change pw action",
        defaultMessage: "change password",
      }),
      redirectPath: toAccount,
    },
    removeIdentity: {
      action: intl.formatMessage({
        id: "remove ID action",
        defaultMessage: "remove identity",
      }),
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
            <span className="top-divider help-text">
              <FormattedMessage
                defaultMessage={`If you wish to {strong} this process without affecting a change you can return straight to {page} page.`}
                description="security zone cancel info"
                values={{
                  page: current?.redirectPath,
                  strong: (
                    <strong>
                      <FormattedMessage description="mfa cancel - strong" defaultMessage={`cancel`} />
                    </strong>
                  ),
                }}
              />
            </span>
          </div>
        </div>
      )}
    </Fragment>
  );
}
