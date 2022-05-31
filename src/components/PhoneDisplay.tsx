import React from "react";
import { HashLink } from "react-router-hash-link";
import { useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";

function PhoneDisplay(): JSX.Element {
  const phones = useDashboardAppSelector((state) => state.phones.phones);
  const primaryPhone = phones.filter((phone) => phone.primary);
  let userData;
  if (!phones.length) {
    userData = (
      <HashLink to={`/profile/settings/#phone`} className="display-data unverified">
        <FormattedMessage description="profile phone display no data" defaultMessage={`add phone number`} />
      </HashLink>
    );
  } else {
    if (!primaryPhone.length) {
      userData = <div className="display-data no-data">{phones[0].number}</div>;
    } else {
      userData = <div className="display-data verified">{primaryPhone[0].number}</div>;
    }
  }

  return (
    <div className="profile-grid-cell">
      <label>
        <FormattedMessage description="profile phone display title" defaultMessage={`Phone number`} />
      </label>
      {userData}
    </div>
  );
}

export default PhoneDisplay;
