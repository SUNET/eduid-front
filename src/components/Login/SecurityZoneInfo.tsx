import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FRONTEND_ACTION } from "components/Common/MultiFactorAuthentication";
import { SECURITY_PATH } from "components/IndexMain";
import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
export const securityZoneAction = sessionStorage.getItem(FRONTEND_ACTION);

export function SecurityZoneInfo(): React.JSX.Element {
  let action;
  if (securityZoneAction === "changeSecurityPreferencesAuthn") {
    action = "change security key preferences";
  }

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
                  action: action,
                  page: (
                    <a href={SECURITY_PATH} aria-label="return to security page">
                      <FormattedMessage description="security zone link" defaultMessage="Security" />
                    </a>
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
