import { AccountId } from "components/AccountId";
import { AccountLinking } from "components/AccountLinking";
import LadokContainer from "components/Ladok";
import { Security } from "components/Security";
import { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";

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
    <Fragment>
      <h1>
        <FormattedMessage description="advanced settings main title" defaultMessage="Enhance your eduID" />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            description="advanced settings description"
            defaultMessage="Increase the security of your eduID or connect it to other services."
          />
        </p>
      </div>
      <Security />
      <AccountLinking />
      <LadokContainer />
      <AccountId />
    </Fragment>
  );
}
