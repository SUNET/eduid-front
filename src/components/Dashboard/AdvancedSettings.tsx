import { faGears } from "@fortawesome/free-solid-svg-icons";
import { Security } from "components/Common/Security";
import { AccountLinking } from "components/Dashboard/AccountLinking";
import LadokContainer from "components/Dashboard/Ladok";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";

/* The Dashboard "Advanced Settings" tab */
export function AdvancedSettings(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Advanced Settings",
      defaultMessage: "Advanced Settings | eduID",
    });
  }, []);

  const currentPage = intl.formatMessage({
    id: "Advanced settings",
    defaultMessage: "Advanced settings",
    description: "Advanced settings",
  });

  return (
    <React.Fragment>
      <DashboardBreadcrumbs pageIcon={faGears} currentPage={currentPage} />
      <section className="intro">
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
      </section>
      <Security />
      <AccountLinking />
      <LadokContainer />
    </React.Fragment>
  );
}
