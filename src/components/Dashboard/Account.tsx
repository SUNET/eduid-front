import { WizardLink } from "components/Common/WizardLink";
import { AccountIdDisplay } from "components/Dashboard/AccountId";
import ChangePasswordDisplay from "components/Dashboard/ChangePasswordDisplay";
import { DashboardBreadcrumbs } from "components/Dashboard/DashboardBreadcrumbs";
import DeleteAccount from "components/Dashboard/DeleteAccount";
import Emails from "components/Dashboard/Emails";
import { LanguagePreference } from "components/Dashboard/Language";
import { SECURITY_PATH } from "components/IndexMain";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import accountIcon from "../../../img/account-icon.svg";
import { AccountLinking } from "./AccountLinking";
import LadokContainer from "./Ladok";

/* The Dashboard "Account settings" tab */
export function Account(): JSX.Element {
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
      <DashboardBreadcrumbs icon={accountIcon} currentPage={currentPage} />
      <section className="intro">
        <h1>
          <FormattedMessage description="settings main title" defaultMessage="Account" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="account settings lead title"
              defaultMessage="Update your eduID account settings, change password or delete your eduID."
            />
          </p>
        </div>
      </section>
      <AccountIdDisplay />
      <Emails />
      <LanguagePreference />
      <ChangePasswordDisplay />
      <AccountLinking />
      <LadokContainer />
      <DeleteAccount />
      <WizardLink
        previousLink={SECURITY_PATH}
        previousText={intl.formatMessage({
          id: "wizard link security",
          defaultMessage: "Back to security settings",
        })}
      />
    </React.Fragment>
  );
}
