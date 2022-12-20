import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGear, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteAccount from "components/DeleteAccount";
import Emails from "components/Emails";
import Phones from "components/Phones";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import PersonalDataParent from "../login/components/PersonalData/PersonalDataParent";
import ChangePasswordDisplay from "./ChangePasswordDisplay";

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
    <React.Fragment>
      <div className="breadcrumb">
        <Link key="/profile/" to="/profile/">
          <FontAwesomeIcon icon={faHome as IconProp} />
          <FormattedMessage description="Start" defaultMessage="Start" />
        </Link>
        /
        <FontAwesomeIcon icon={faGear as IconProp} />
        <FormattedMessage description="settings" defaultMessage="Settings" />
      </div>
      <div className="intro">
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
      </div>
      <PersonalDataParent />
      <Emails />
      <Phones />
      <ChangePasswordDisplay />
      <DeleteAccount />
    </React.Fragment>
  );
}
