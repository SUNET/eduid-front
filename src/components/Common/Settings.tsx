import { faGear } from "@fortawesome/free-solid-svg-icons";
import { postDeleteAccount } from "apis/eduidSecurity";
import ChangePasswordDisplay from "components/Dashboard/ChangePasswordDisplay";
import { DashboardBreadcrumbs } from "components/Dashboard/DashboardBreadcrumbs";
import DeleteAccount from "components/Dashboard/DeleteAccount";
import Emails from "components/Dashboard/Emails";
import PersonalDataParent from "components/Dashboard/PersonalDataParent";
import Phones from "components/Dashboard/Phones";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

/* The Dashboard "Settings" tab */
export function Settings(): JSX.Element {
  const intl = useIntl();
  const frontend_action = useAppSelector((state) => state.authn.frontend_action);
  const is_loaded = useAppSelector((state) => state.app.is_loaded);
  const dispatch = useAppDispatch();

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

  async function deleteAccount() {
    const response = await dispatch(postDeleteAccount());
    if (postDeleteAccount.fulfilled.match(response)) {
      window.location.assign(response.payload.location);
    }
  }

  useEffect(() => {
    if (frontend_action === "terminateAccountAuthn") {
      deleteAccount();
    }
  }, [frontend_action]);

  return (
    <React.Fragment>
      <DashboardBreadcrumbs pageIcon={faGear} currentPage={currentPage} />
      <section className="intro">
        <h1>
          <FormattedMessage description="settings main title" defaultMessage="Manage your eduID settings" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="settings lead title"
              defaultMessage="Update your eduID account settings, change password or delete your eduID."
            />
          </p>
        </div>
      </section>
      <PersonalDataParent />
      <Emails />
      <Phones />
      <ChangePasswordDisplay />
      <DeleteAccount />
    </React.Fragment>
  );
}
