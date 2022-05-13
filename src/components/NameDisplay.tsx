import React, { Component } from "react";
import { useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

function NameDisplay(): JSX.Element {
  let userData;
  const name = useDashboardAppSelector((state) => state.personal_data);
  if (!name) {
    userData = (
      <Link to={`/profile/settings/`} className="display-data unverified">
        <FormattedMessage description="profile name display no data" defaultMessage={`add name`} />
      </Link>
    );
  } else {
    userData = (
      <div className="display-data verified">
        {name.given_name} {name.surname}
      </div>
    );
  }
  return (
    <div key="0" className="profile-grid-cell">
      <label key="0">
        <FormattedMessage description="profile name display title" defaultMessage={`Name`} />
      </label>
      {userData}
    </div>
  );
}

export default NameDisplay;
