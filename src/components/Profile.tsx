import React, { Fragment } from "react";
import PersonalDataParent from "login/components/PersonalData/PersonalDataParent";
import Emails from "./Emails";
import Phones from "./Phones";
import { AccountId } from "./AccountId";
import { FormattedMessage } from "react-intl";
import { useEffect } from "react";
import { useIntl } from "react-intl";

export default function Profile(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Profile",
      defaultMessage: "Profile | eduID",
    });
  }, []);

  return (
    <Fragment>
      <div className="intro">
        <h1>
          <FormattedMessage description="profile main title" defaultMessage="Profile" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage description="profile description" defaultMessage="profile lead text" />
          </p>
        </div>
      </div>
      <PersonalDataParent />
      <Emails />
      <Phones />
      <AccountId />
    </Fragment>
  );
}
