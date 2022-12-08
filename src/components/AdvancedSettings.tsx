import { AccountId } from "components/AccountId";
import { AccountLinking } from "components/AccountLinking";
import LadokContainer from "components/Ladok";
import { Security } from "components/Security";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

/* The Dashboard "Advanced Settings" tab */
export function AdvancedSettings(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Advanced Settings",
      defaultMessage: "Advanced Settings | eduID",
    });
  }, []);

  return (
    <React.Fragment>
      <div className="intro">
        <h1>
          <FormattedMessage description="advanced settings main title" defaultMessage="Enhance your eduID" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="advanced settings lead title"
              defaultMessage="Increase the security of your eduID or connect it to other services."
            />
          </p>
        </div>
      </div>
      <Security />
      <AccountLinking />
      <LadokContainer />
      <AccountId />
    </React.Fragment>
  );
}
