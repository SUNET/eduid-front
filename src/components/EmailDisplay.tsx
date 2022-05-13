import React from "react";
import { useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";

function EmailDisplay(): JSX.Element {
  const emails = useDashboardAppSelector((state) => state.emails.emails);
  const primary = emails.filter((email) => email.primary);
  let userData;
  // is it possible to happen, no primary email?
  if (!primary.length) {
    userData = (
      <div className="display-data no-data">
        <FormattedMessage description="profile email display no data" defaultMessage={`no email added`} />
      </div>
    );
  } else {
    userData = <div className="display-data verified">{primary[0].email}</div>;
  }

  return (
    <div className="profile-grid-cell">
      <label key="0">
        <FormattedMessage description="profile email display title" defaultMessage={`Email address`} />
      </label>
      {userData}
    </div>
  );
}

export default EmailDisplay;
