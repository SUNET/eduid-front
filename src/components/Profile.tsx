import NinDisplay from "components/NinDisplay";
import EmailDisplay from "components/EmailDisplay";
import NameDisplay from "components/NameDisplay";
import PhoneDisplay from "components/PhoneDisplay";
import { useDashboardAppSelector } from "dashboard-hooks";
import React from "react";

export default function Profile(): JSX.Element {
  const nin = useDashboardAppSelector((state) => state.identities.nin);

  return (
    <div id="profile-grid">
      <NameDisplay />
      <NinDisplay nin={nin} allowDelete={false} />
      <PhoneDisplay />
      <EmailDisplay />
    </div>
  );
}
