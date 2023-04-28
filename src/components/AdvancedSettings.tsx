import { faGears } from "@fortawesome/free-solid-svg-icons";
import { AccountId } from "components/AccountId";
import { AccountLinking } from "components/AccountLinking";
import LadokContainer from "components/Ladok";
import { Security } from "components/Security";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";
import { SectionIntro } from "./SectionIntro";

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
      <SectionIntro
        heading={<FormattedMessage description="advanced settings main title" defaultMessage="Enhance your eduID" />}
        description={
          <FormattedMessage
            description="advanced settings lead title"
            defaultMessage="Increase the security of your eduID or connect it to other services."
          />
        }
      />
      <Security />
      <AccountLinking />
      <LadokContainer />
      <AccountId />
    </React.Fragment>
  );
}
