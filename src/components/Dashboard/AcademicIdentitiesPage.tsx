import { faGear } from "@fortawesome/free-solid-svg-icons";
import { DashboardBreadcrumbs } from "components/Dashboard/DashboardBreadcrumbs";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { AccountLinking } from "./AccountLinking";
import LadokContainer from "./Ladok";

/* The Dashboard "Account settings" tab */
export function AcademicIdentities(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Academic identities",
      defaultMessage: "Academic identities | eduID",
    });
  }, []);

  const currentPage = intl.formatMessage({
    id: "Academic Identities",
    defaultMessage: "Academic Identities",
    description: "Academic Identities",
  });

  return (
    <React.Fragment>
      <DashboardBreadcrumbs pageIcon={faGear} currentPage={currentPage} />
      <section className="intro">
        <h1>
          <FormattedMessage description="settings main title" defaultMessage="Academic Identities" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="account settings lead title"
              defaultMessage="Connect your eduID account to other academic identities"
            />
          </p>
        </div>
      </section>
      <AccountLinking />
      <LadokContainer />
    </React.Fragment>
  );
}
