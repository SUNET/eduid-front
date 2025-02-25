import { MultiFactorAuthentication } from "components/Common/MultiFactorAuthentication";
import { WizardLink } from "components/Common/WizardLink";
import { ACCOUNT_PATH, IDENTITY_PATH } from "components/IndexMain";
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
      <WizardLink
        previousLink={IDENTITY_PATH}
        previousText={intl.formatMessage({
          id: "wizard link identity",
          defaultMessage: "Back to Identity Settings",
        })}
        nextLink={ACCOUNT_PATH}
        nextText={intl.formatMessage({
          id: "wizard link security",
          defaultMessage: "Continue to Account Settings",
        })}
      />
    </React.Fragment>
  );
}
