import { faGear } from "@fortawesome/free-solid-svg-icons";
import { AccountId } from "components/Dashboard/AccountId";
import ChangePasswordDisplay from "components/Dashboard/ChangePasswordDisplay";
import { DashboardBreadcrumbs } from "components/Dashboard/DashboardBreadcrumbs";
import DeleteAccount from "components/Dashboard/DeleteAccount";
import Emails from "components/Dashboard/Emails";
import { LanguagePreference } from "components/Dashboard/Language";
import Phones from "components/Dashboard/Phones";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { AccountLinking } from "./AccountLinking";
import LadokContainer from "./Ladok";

/* The Dashboard "Account settings" tab */
export function AccountSettings(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Account settings",
      defaultMessage: "Account settings | eduID",
    });
  }, []);

  const currentPage = intl.formatMessage({
    id: "Account Settings",
    defaultMessage: "Account Settings",
    description: "Account Settings",
  });

  return (
    <React.Fragment>
      <DashboardBreadcrumbs pageIcon={faGear} currentPage={currentPage} />
      <section className="intro">
        <h1>
          <FormattedMessage description="settings main title" defaultMessage="Account Settings" />
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
      <AccountId />
      <Emails />
      <AccountLinking />
      <LadokContainer />
      <Phones />
      <LanguagePreference />
      <ChangePasswordDisplay />
      <DeleteAccount />
    </React.Fragment>
  );
}
