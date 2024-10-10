import { faGears } from "@fortawesome/free-solid-svg-icons";
import { MultifactorAuthentication } from "components/Common/MultifactorAuthentication";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";

/* The Dashboard "Advanced Settings" tab */
export function AccountSecurity(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Security",
      defaultMessage: "Account Security | eduID",
    });
  }, []);

  const currentPage = intl.formatMessage({
    id: "Account Security",
    defaultMessage: "Account Security",
    description: "Account Security",
  });

  return (
    <React.Fragment>
      <DashboardBreadcrumbs pageIcon={faGears} currentPage={currentPage} />
      <section className="intro">
        <h1>
          <FormattedMessage description="security main title" defaultMessage="Account Security" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage description="security lead title" defaultMessage="Increase the security of your eduID." />
          </p>
        </div>
      </section>
      <MultifactorAuthentication />
    </React.Fragment>
  );
}
