import { MultiFactorAuthentication } from "components/Common/MultiFactorAuthentication";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import securityIcon from "../../../img/security-icon.svg";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";

/* The Dashboard "Advanced Settings" tab */
export function Security(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Security",
      defaultMessage: "Security | eduID",
    });
  }, []);

  const currentPage = intl.formatMessage({
    id: "Security",
    defaultMessage: "Security",
    description: "Security",
  });

  return (
    <React.Fragment>
      <DashboardBreadcrumbs icon={securityIcon} currentPage={currentPage} />
      <section className="intro">
        <h1>
          <FormattedMessage description="security main title" defaultMessage="Security" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage description="security lead title" defaultMessage="Enhanced security of your eduID." />
          </p>
        </div>
      </section>
      <MultiFactorAuthentication />
    </React.Fragment>
  );
}
