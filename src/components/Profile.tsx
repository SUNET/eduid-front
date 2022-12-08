import EmailDisplay from "components/EmailDisplay";
import NameDisplay from "components/NameDisplay";
import NinDisplay from "components/NinDisplay";
import PhoneDisplay from "components/PhoneDisplay";
import { useDashboardAppSelector } from "dashboard-hooks";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export default function Profile(): JSX.Element {
  const nin = useDashboardAppSelector((state) => state.identities.nin);
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Profile",
      defaultMessage: "Profile | eduID",
    });
  }, []);

  return (
    <React.Fragment>
      <div className="intro">
        <h1>
          <FormattedMessage description="profile main title" defaultMessage="Your eduID profile" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="profile lead title"
              defaultMessage="Add or edit your personal user information."
            />
          </p>
        </div>
      </div>

      <div id="profile-grid">
        <NameDisplay />
        <NinDisplay nin={nin} allowDelete={false} />
        <PhoneDisplay />
        <EmailDisplay />
      </div>
    </React.Fragment>
  );
}
