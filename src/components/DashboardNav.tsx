import { useDashboardAppSelector } from "dashboard-hooks";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { NavLink, withRouter } from "react-router-dom";
import NotificationTip from "../login/components/NotificationTip/NotificationTip";
import { translate } from "../login/translation";

// TODO: make a typed slice out of phone (like nins) and move this there
//       (and remove "as PhoneInfo[]" below, since it will be deduced automatically)
interface PhoneInfo {
  number: string;
  verified: boolean;
  primary: boolean;
}

function DashboardNav(): JSX.Element {
  const [active, setActive] = useState(false);
  const nins = useDashboardAppSelector((state) => state.nins.nins);
  const phones = useDashboardAppSelector((state) => state.phones.phones as PhoneInfo[]);
  const verifiedNin = nins.filter((nin) => nin.verified);
  const verifiedSweNumber = phones.filter((phone) => phone.verified && phone.number.startsWith("+46"));
  const unverifiedNumber = phones.filter((phone) => !phone.verified);
  // depending on languages show different styles
  const selectedLanguage = useDashboardAppSelector((state) => state.intl.locale) as string;

  /*
   * Render on-mouse-over tip at the "Identity" tab telling the user how they might go ahead with proofing their identity
   */
  function tips_at_identity(): JSX.Element | undefined {
    if (verifiedNin.length) {
      // user has a verified nin already, no tips necessary
      return undefined;
    }

    const options: JSX.Element[] = [];

    // Freja eID+ is available to everyone
    options.push(
      <b>
        <FormattedMessage defaultMessage="a digital ID-card" description="On-mouse-over tooltip for Identity tab" />
      </b>
    );

    options.push(
      <b>
        <FormattedMessage defaultMessage="some other option" description="On-mouse-over tooltip for Identity tab" />
      </b>
    );

    const tipText = (
      <span>
        <FormattedMessage
          defaultMessage="You can verify your identity with"
          description="On-mouse-over tooltip for Identity tab"
        />{" "}
        {options.map((elem, index) => (
          <span>
            {index ? ", " : ""}
            {elem}
          </span>
        ))}
      </span>
    );

    return <NotificationTip position={`settings ${selectedLanguage}`} tipText={tipText} />;
  }

  /*
   * Render on-mouse-over tip at the "Settings" tab telling the user to confirm any unconfirmed phone numbers
   */
  function tips_at_settings(): JSX.Element | undefined {
    if (!unverifiedNumber.length) {
      // no unverified numbers, don't need to tell the user anything
      return undefined;
    }
    const tipText = (
      <FormattedMessage
        defaultMessage="<b>Confirm your number</b> to verify your id by phone"
        description="On-mouse-over tooltip for Settings tab"
      />
    );

    return <NotificationTip position={`settings ${selectedLanguage}`} tipText={tipText} />;
  }

  const tipsAtSettings = tips_at_settings();

  return (
    <nav id="dashboard-nav">
      <ul>
        <NavLink exact activeClassName="active" to={`/profile/`}>
          <li>{translate("dashboard_nav.profile")}</li>
        </NavLink>
        <NavLink exact activeClassName="active" to={`/profile/verify-identity/`}>
          <li>
            {translate("dashboard_nav.identity")}
            {tips_at_identity()}
          </li>
        </NavLink>
        <NavLink
          className={tipsAtSettings && active ? `nav-settings ${selectedLanguage}` : undefined}
          exact
          activeClassName="active"
          to={`/profile/settings/`}
        >
          <li>
            {translate("dashboard_nav.settings")}
            {tipsAtSettings}
          </li>
        </NavLink>
        <NavLink
          className={tipsAtSettings && active ? `nav-advanced-settings ${selectedLanguage}` : undefined}
          exact
          activeClassName="active"
          to={`/profile/settings/advanced-settings`}
        >
          <li>{translate("dashboard_nav.advanced-settings")}</li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default withRouter(DashboardNav);
