import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmailDisplay from "components/EmailDisplay";
import NameDisplay from "components/NameDisplay";
import NinDisplay from "components/NinDisplay";
import PhoneDisplay from "components/PhoneDisplay";
import { useDashboardAppSelector } from "dashboard-hooks";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

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
      <div className="breadcrumb">
        <Link key="/profile/" to="/profile/">
          <FormattedMessage description="Start" defaultMessage="Start" />
        </Link>
        /
        <FontAwesomeIcon icon={faUser as IconProp} />
        <FormattedMessage description="profile" defaultMessage="Profile" />
      </div>
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
