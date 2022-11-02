import NinDisplay from "components/NinDisplay";
import EmailDisplay from "components/EmailDisplay";
import NameDisplay from "components/NameDisplay";
import PhoneDisplay from "components/PhoneDisplay";
import { useDashboardAppSelector } from "dashboard-hooks";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
import React, { Fragment } from "react";

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
    <Fragment>
      <h1>
        <FormattedMessage description="profile main title" defaultMessage="Your eduID profile" />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            description="profile description"
            defaultMessage="Add or edit your personal user information."
          />
        </p>
      </div>

      <div id="profile-grid">
        <NameDisplay />
        <NinDisplay nin={nin} allowDelete={false} />
        <PhoneDisplay />
        <EmailDisplay />
      </div>
    </Fragment>
  );
}
