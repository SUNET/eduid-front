import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EduIDButton } from "components/Common/EduIDButton";
import { FRONTEND_ACTION } from "components/Common/MultiFactorAuthentication";
import { ACCOUNT_PATH, IDENTITY_PATH, SECURITY_PATH } from "helperFunctions/paths";

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
  redirectUrl: string;
  redirectPath?: string;
}

export function SecurityZoneInfo() {
  const intl = useIntl();

  const actionMap: Record<SecurityZoneAction, ActionInfo> = {
    changeSecurityPreferencesAuthn: {
      action: intl.formatMessage({
        id: "securityZoneInfo.changeSecurity",
        defaultMessage: "change security key preferences",
      }),
      redirectUrl: SECURITY_PATH,
      redirectPath: intl.formatMessage({
        id: "securityZoneInfo.security",
        defaultMessage: "security",
      }),
    },
    addSecurityKeyAuthn: {
      action: intl.formatMessage({
        id: "securityZoneInfo.add",
        defaultMessage: "add security key",
      }),
      redirectUrl: SECURITY_PATH,
      redirectPath: intl.formatMessage({
        id: "securityZoneInfo.security",
        defaultMessage: "security",
      }),
    },
    removeSecurityKeyAuthn: {
      action: intl.formatMessage({
        id: "securityZoneInfo.removeSecurity",
        defaultMessage: "remove security key",
      }),
      redirectUrl: SECURITY_PATH,
      redirectPath: intl.formatMessage({
        id: "securityZoneInfo.security",
        defaultMessage: "security",
      }),
    },
    verifyCredential: {
      action: intl.formatMessage({
        id: "securityZoneInfo.verify",
        defaultMessage: "verify security key",
      }),
      redirectUrl: SECURITY_PATH,
      redirectPath: intl.formatMessage({
        id: "securityZoneInfo.security",
        defaultMessage: "security",
      }),
    },
    terminateAccountAuthn: {
      action: intl.formatMessage({
        id: "securityZoneInfo.delete",
        defaultMessage: "delete account",
      }),
      redirectUrl: ACCOUNT_PATH,
      redirectPath: intl.formatMessage({
        id: "securityZoneInfo.account",
        defaultMessage: "account",
      }),
    },
    changepwAuthn: {
      action: intl.formatMessage({
        id: "securityZoneInfo.change",
        defaultMessage: "change password",
      }),
      redirectUrl: ACCOUNT_PATH,
      redirectPath: intl.formatMessage({
        id: "securityZoneInfo.account",
        defaultMessage: "account",
      }),
    },
    removeIdentity: {
      action: intl.formatMessage({
        id: "securityZoneInfo.remove",
        defaultMessage: "remove identity",
      }),
      redirectUrl: IDENTITY_PATH,
      redirectPath: intl.formatMessage({
        id: "securityZoneInfo.identity",
        defaultMessage: "identity",
      }),
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
            <div className="top-divider help-text">
              <FormattedMessage
                id="securityZoneInfo.info"
                defaultMessage={`If you wish to cancel this process without making any changes, click the button below to return to the {page} page.`}
                description="security zone cancel info"
                values={{
                  page: current?.redirectPath,
                }}
              />
            </div>
            <div className="buttons">
              <EduIDButton
                onClick={() => {
                  sessionStorage.clear();
                  if (current?.redirectUrl) globalThis.location.href = current.redirectUrl;
                }}
                buttonstyle="secondary sm"
                id="cancel-button"
              >
                <FormattedMessage id="common.cancel" defaultMessage="cancel" description="cancel button" />
              </EduIDButton>
            </div>

            {/* <span className="top-divider help-text">
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
              /> */}
            {/* </span> */}
          </div>
        </div>
      )}
    </>
  );
}
