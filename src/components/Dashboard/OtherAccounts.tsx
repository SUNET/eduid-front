import { faGear } from "@fortawesome/free-solid-svg-icons";
import { AccountLinking } from "components/Dashboard/AccountLinking";
import { DashboardBreadcrumbs } from "components/Dashboard/DashboardBreadcrumbs";
import LadokContainer from "components/Dashboard/Ladok";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

/* The Dashboard "Settings" tab */
export function OtherAccounts(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Account",
      defaultMessage: "Account | eduID",
    });
  }, []);

  const currentPage = intl.formatMessage({
    id: "Account",
    defaultMessage: "Account",
    description: "Account",
  });

  return (
    <React.Fragment>
      <DashboardBreadcrumbs pageIcon={faGear} currentPage={currentPage} />
      <section className="intro">
        <h1>
          <FormattedMessage description="account main title" defaultMessage="Other accounts" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="account lead title"
              defaultMessage="Connect your eduID account with other academic identification services"
            />
          </p>
        </div>
      </section>
      <AccountLinking />
      <LadokContainer />
    </React.Fragment>
  );
}
