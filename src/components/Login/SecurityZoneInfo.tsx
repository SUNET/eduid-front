import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FRONTEND_ACTION } from "components/Common/MultiFactorAuthentication";
import { ACCOUNT_PATH, IDENTITY_PATH, SECURITY_PATH } from "helperFunctions/paths";

import { ReactElement } from "react";
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

export function SecurityZoneInfo() {
  const intl = useIntl();

  const toSecurity = (
    <a href={SECURITY_PATH} aria-label="return to security page" onClick={() => sessionStorage.clear()}>
      <FormattedMessage id="common.security" description="security zone security link" defaultMessage="Security" />
    </a>
  );

  const toAccount = (
    <a href={ACCOUNT_PATH} aria-label="return to account page" onClick={() => sessionStorage.clear()}>
      <FormattedMessage id="common.account" description="security zone account link" defaultMessage="Account" />
    </a>
  );

  const toIdentity = (
    <a href={IDENTITY_PATH} aria-label="return to identity page" onClick={() => sessionStorage.clear()}>
      <FormattedMessage id="common.identity" description="security zone identity link" defaultMessage="Identity" />
    </a>
  );

  const actionMap: Record<SecurityZoneAction, ActionInfo> = {
    changeSecurityPreferencesAuthn: {
      action: intl.formatMessage({
        id: "securityZoneInfo.changeSecurity",
        defaultMessage: "change security key preferences",
      }),
      redirectPath: toSecurity,
    },
    addSecurityKeyAuthn: {
      action: intl.formatMessage({
        id: "securityZoneInfo.add",
        defaultMessage: "add security key",
      }),
      redirectPath: toSecurity,
    },
    removeSecurityKeyAuthn: {
      action: intl.formatMessage({
        id: "securityZoneInfo.removeSecurity",
        defaultMessage: "remove security key",
      }),
      redirectPath: toSecurity,
    },
    verifyCredential: {
      action: intl.formatMessage({
        id: "securityZoneInfo.verify",
        defaultMessage: "verify security key",
      }),
      redirectPath: toSecurity,
    },
    terminateAccountAuthn: {
      action: intl.formatMessage({
        id: "securityZoneInfo.delete",
        defaultMessage: "delete account",
      }),
      redirectPath: toAccount,
    },
    changepwAuthn: {
      action: intl.formatMessage({
        id: "securityZoneInfo.change",
        defaultMessage: "change password",
      }),
      redirectPath: toAccount,
    },
    removeIdentity: {
      action: intl.formatMessage({
        id: "securityZoneInfo.remove",
        defaultMessage: "remove identity",
      }),
      redirectPath: toIdentity,
    },
  };

  const current = securityZoneAction ? actionMap[securityZoneAction as SecurityZoneAction] : undefined;

  return (
    <>
      {securityZoneAction && (
        <div className="status-box">
          <div className="checkbox-wrapper">
            <FontAwesomeIcon icon={faCircleExclamation} className="disabled" />
          </div>
          <div className="text-wrapper">
            <h3>
              <FormattedMessage
                id="securityZoneInfo.heading"
                defaultMessage={`Authenticate to continue`}
                description="security zone redirect info"
              />
            </h3>
            <p>
              <FormattedMessage
                id="securityZoneInfo.afterward"
                defaultMessage={`Afterward, you will be redirected to the page to {action}.`}
                description="security zone redirect info"
                values={{
                  action: current?.action,
                }}
              />
            </p>
            <span className="top-divider help-text">
              <FormattedMessage
                id="securityZoneInfo.info"
                defaultMessage={`If you wish to {strong} this process without affecting a change you can return straight to {page} page.`}
                description="security zone cancel info"
                values={{
                  page: current?.redirectPath,
                  strong: (
                    <strong>
                      <FormattedMessage
                        id="securityZoneInfo.mfa"
                        description="mfa cancel - strong"
                        defaultMessage={`cancel`}
                      />
                    </strong>
                  ),
                }}
              />
            </span>
          </div>
        </div>
      )}
    </>
  );
}
