import NinDisplay from "components/NinDisplay";
import EmailDisplay from "containers/EmailDisplay";
import NameDisplay from "containers/NameDisplay";
import PhoneDisplay from "containers/PhoneDisplay";
import { useDashboardAppSelector } from "dashboard-hooks";
import React from "react";

export default function Profile(): JSX.Element {
  const first_nin = useDashboardAppSelector((state) => state.nins.first_nin);

  return (
    <div id="profile-grid">
      <NameDisplay />
      <NinDisplay nin={first_nin} allowDelete={false} />
      <PhoneDisplay />
      <EmailDisplay />
    </div>
  );
}
