import { faGear } from "@fortawesome/free-solid-svg-icons";
import DeleteAccount from "components/DeleteAccount";
import Emails from "components/Emails";
import Phones from "components/Phones";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import PersonalDataParent from "../login/components/PersonalData/PersonalDataParent";
import ChangePasswordDisplay from "./ChangePasswordDisplay";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";
import { SectionIntro } from "./SectionIntro";

/* The Dashboard "Settings" tab */
export function Settings(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Settings",
      defaultMessage: "Settings | eduID",
    });
  }, []);

  const currentPage = intl.formatMessage({
    id: "Settings",
    defaultMessage: "Settings",
    description: "Settings",
  });

  return (
    <React.Fragment>
      <DashboardBreadcrumbs pageIcon={faGear} currentPage={currentPage} />
      <SectionIntro
        heading={<FormattedMessage description="settings main title" defaultMessage="Manage your eduID settings" />}
        description={
          <FormattedMessage
            description="settings lead title"
            defaultMessage="Update your eduID account settings, change password or delete your eduID."
          />
        }
      />
      <PersonalDataParent />
      <Emails />
      <Phones />
      <ChangePasswordDisplay />
      <DeleteAccount />
    </React.Fragment>
  );
}
