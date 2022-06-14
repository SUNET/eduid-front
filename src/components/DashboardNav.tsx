import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";
import { useDashboardAppSelector } from "dashboard-hooks";
import { translate } from "../login/translation";
import NotificationTip from "./NotificationTip";

// export for use in tests
export const activeClassName = "active";

function DashboardNav(): JSX.Element {
  const [active, setActive] = useState(false); // true if *any* NotificationTip is active and shows it's speech bubble
  const nins = useDashboardAppSelector((state) => state.nins.nins);
  const phones = useDashboardAppSelector((state) => state.phones.phones);
  const verifiedNin = nins.filter((nin) => nin.verified);
  const verifiedPhones = phones.filter((phone) => phone.verified);
  // depending on languages show different styles
  const selectedLanguage = useDashboardAppSelector((state) => state.intl.locale);

  /*
   * Render on-mouse-over tip at the "Identity" tab nudging the user to proof their identity
   */
  function getTipsAtIdentity(): JSX.Element | undefined {
    if (verifiedNin.length) {
      // user has a verified nin already, no tips necessary
      return undefined;
    }

    return (
      <NotificationTip
        position={`settings ${selectedLanguage}`}
        tipText={
          <FormattedMessage
            defaultMessage="Verify your identity to get the most ouf of your eduID"
            description="Dashboard navigation tooltip"
          />
        }
      />
    );
  }

  /*
   * Render on-mouse-over tip at the "Settings" tab telling the user to confirm any unconfirmed phone numbers
   */
  function getTipsAtSettings(): JSX.Element | undefined {
    if (verifiedPhones.length) {
      // one or more registered phones, don't need to tell the user anything
      return undefined;
    }

    return (
      <NotificationTip
        setActive={setActive}
        position={`settings ${selectedLanguage}`}
        tipText={
          <FormattedMessage
            defaultMessage="Add and verify your phone number for better security"
            description="Dashboard navigation tooltip"
          />
        }
      />
    );
  }

  const tipsAtSettings = getTipsAtSettings();
  /* Styling needs to be different for the two languages we have because of different lengths */
  const settingsClass = tipsAtSettings && active ? `nav-settings ${selectedLanguage}` : undefined;
  const advancedSettingsClass = tipsAtSettings && active ? `nav-advanced-settings ${selectedLanguage}` : undefined;

  return (
    <nav id="dashboard-nav">
      <h5>eduID Dashboard:</h5>
      <ul>
        <li>
          <NavLink exact activeClassName={activeClassName} to={`/profile/`}>
            {translate("dashboard_nav.profile")}
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName={activeClassName} to={`/profile/verify-identity/`}>
            {translate("dashboard_nav.identity")}
            {getTipsAtIdentity()}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={settingsClass}
            exact
            activeClassName={activeClassName}
            to={`/profile/settings/personaldata`}
          >
            {translate("dashboard_nav.settings")}
            {tipsAtSettings}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={advancedSettingsClass}
            exact
            activeClassName={activeClassName}
            to={`/profile/settings/advanced-settings`}
          >
            {translate("dashboard_nav.advanced-settings")}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default DashboardNav;
