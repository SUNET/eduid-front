import { faGears } from "@fortawesome/free-solid-svg-icons";
import { Security } from "components/Common/Security";

import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";

/* The Dashboard "Account Linking" tab */
export function AdvancedSettings(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Account Linking",
      defaultMessage: "Account Linking | eduID",
    });
  }, []);

  const currentPage = intl.formatMessage({
    id: "Security/2FA",
    defaultMessage: "Security/2FA",
    description: "Security/2FA",
  });

  return (
    <React.Fragment>
      <DashboardBreadcrumbs pageIcon={faGears} currentPage={currentPage} />
      <section className="intro">
        <h1>
          <FormattedMessage
            description="account linking main title"
            defaultMessage="Connect your eduID other services"
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="account linking lead title"
              defaultMessage="Connect your eduID to other services."
            />
          </p>
        </div>
        <Security />
      </section>
    </React.Fragment>
  );
}
