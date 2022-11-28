import DeleteAccount from "components/DeleteAccount";
import Emails from "components/Emails";
import Phones from "components/Phones";
import { Fragment, useEffect } from "react";
import PersonalDataParent from "../login/components/PersonalData/PersonalDataParent";
import ChangePasswordDisplay from "./ChangePasswordDisplay";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";

/* The Dashboard "Settings" tab */
export function Settings(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Settings",
      defaultMessage: "Settings | eduID",
    });
  }, []);

  return (
    <Fragment>
      <h1>
        <FormattedMessage description="settings main title" defaultMessage="Manage your eduID settings" />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            description="settings description"
            defaultMessage="Update your eduID account settings, change password or delete your eduID."
          />
        </p>
      </div>

      <PersonalDataParent />
      <Emails />
      <Phones />
      <ChangePasswordDisplay />
      <DeleteAccount />
    </Fragment>
  );
}
