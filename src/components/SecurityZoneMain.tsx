import React from "react";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";

export function SecurityZoneIntro(): JSX.Element {
  return (
    <React.Fragment>
      <h1>
        <FormattedMessage defaultMessage="Security Zone" description="Security Zone heading" />
      </h1>
      <div className="lead">
        <p tabIndex={0}>
          <FormattedMessage
            defaultMessage={`Security zone has a time limit before you need to
                reauthenticate yourself to continue accessing the security settings.`}
            description="Security zone description"
          />
        </p>
      </div>
    </React.Fragment>
  );
}

export function SecurityZoneNav(): JSX.Element {
  return (
    <nav id="security-zone-nav" className="security-zone-nav">
      <ul>
        <li>
          <NavLink className={({ isActive }) => (isActive ? "active" : undefined)} to="/profile/security-zone/security">
            <FormattedMessage defaultMessage="Security" description="Security zone tab Security" />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/profile/security-zone/change-password/"
          >
            <FormattedMessage defaultMessage="Change Password" description="Security zone tab Change Password" />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to="/profile/security-zone/delete-account/"
          >
            <FormattedMessage defaultMessage="Delete Account" description="Security zone tab Delete Account" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
