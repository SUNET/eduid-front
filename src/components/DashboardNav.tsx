import { useDashboardAppSelector } from "dashboard-hooks";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";
import NotificationTip from "./NotificationTip";

// export for use in tests
export const activeClassName = "active";
export const dashboardHeading = "eduID Dashboard:";

function DashboardNav(): JSX.Element {
  const [active, setActive] = useState(false); // true if *any* NotificationTip is active and shows it's speech bubble
  const nin = useDashboardAppSelector((state) => state.identities.nin);
  const phones = useDashboardAppSelector((state) => state.phones.phones);
  const verifiedPhones = phones.filter((phone) => phone.verified);
  // depending on languages show different styles
  const selectedLanguage = useDashboardAppSelector((state) => state.intl.locale);

  /*
   * Render on-mouse-over tip at the "Identity" tab nudging the user to proof their identity
   */
  function getTipsAtIdentity(): JSX.Element | undefined {
    if (nin?.verified) {
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
      <h5>{dashboardHeading}</h5>
      <ul>
        <li>
          <NavLink className={({ isActive }) => (isActive ? activeClassName : undefined)} to="/profile/" end>
            <FormattedMessage defaultMessage="Profile" description="Dashboard nav tab name" />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? activeClassName : undefined)}
            to="/profile/verify-identity/"
          >
            <FormattedMessage defaultMessage="Identity" description="Dashboard nav tab name" />
            {getTipsAtIdentity()}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? activeClassName : settingsClass)}
            to="/profile/settings/personaldata"
          >
            <FormattedMessage defaultMessage="Settings" description="Dashboard nav tab name" />
            {tipsAtSettings}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? activeClassName : advancedSettingsClass)}
            to="/profile/settings/advanced-settings"
          >
            <FormattedMessage defaultMessage="Advanced settings" description="Dashboard nav tab name" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default DashboardNav;
