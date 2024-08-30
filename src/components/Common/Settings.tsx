import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Security } from "components/Common/Security";
import { AccountId } from "components/Dashboard/AccountId";
import ChangePasswordDisplay from "components/Dashboard/ChangePasswordDisplay";
import { DashboardBreadcrumbs } from "components/Dashboard/DashboardBreadcrumbs";
import DeleteAccount from "components/Dashboard/DeleteAccount";
import Emails from "components/Dashboard/Emails";
import Phones from "components/Dashboard/Phones";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

/* The Dashboard "Settings" tab */
export function Settings(): JSX.Element {
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
          <FormattedMessage description="account main title" defaultMessage="Manage your account" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="account lead title"
              defaultMessage="Update your eduID account settings, change password, add a security key (2FA) or delete your eduID."
            />
          </p>
        </div>
      </section>
      <AccountId />
      <Emails />
      <ChangePasswordDisplay />
      <Security />
      <Phones />
      <DeleteAccount />
    </React.Fragment>
  );
}
