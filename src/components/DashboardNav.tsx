import { useDashboardAppSelector } from "dashboard-hooks";
import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import NotificationTip from "../login/components/NotificationTip/NotificationTip";
import { translate } from "../login/translation";

interface PhoneInfo {
  number: string;
  verified: boolean;
  primary: boolean;
}

function DashboardNav() {
  const [active, setActive] = useState(false);
  const nins = useDashboardAppSelector((state) => state.nins.nins);
  const phones = useDashboardAppSelector((state) => state.phones.phones as PhoneInfo[]);
  const verifiedNin = nins.filter((nin) => nin.verified);
  const verifiedSweNumber = phones.filter((phone) => phone.verified && phone.number.startsWith("+46"));
  const unverifiedNumber = phones.filter((phone) => !phone.verified);
  // depending on languages show different styles
  const selectedLanguage = useDashboardAppSelector((state) => state.intl.locale);

  let tipsAtIdentity, tipsAtSettings;

  if (!verifiedNin.length) {
    // when user is accessing the profile check if user has an unverified nin
    if (!nins.length) {
      // check if nin is not added, then rendering text on IDENTITY tab, only possible to verify with a freja eId
      tipsAtIdentity = (
        <NotificationTip textLength={"short"} tipText={translate("dashboard_nav.identity-verify-freja")} />
      );
    } else {
      // else user has added id number,rendering text on IDENTITY tab, possible to verify by post and with a freja eId
      tipsAtIdentity = <NotificationTip tipText={translate("dashboard_nav.identity-verify-post-freja")} />;
      if (phones.length) {
        // then check if there is a number added to the phones array
        if (verifiedSweNumber.length) {
          // if a number is added to the phone array, check if number is verified and a Swedish phone number, rendering text on IDENTITY tab, user can verify by post, phone or freja eId
          tipsAtIdentity = <NotificationTip tipText={translate("dashboard_nav.identity-verify-post-phone-freja")} />;
        } else if (unverifiedNumber.length) {
          // else if phone number is not confirmed, rendering text on SETTINGS tab "Confirm your number..."
          tipsAtSettings = (
            <NotificationTip
              position={`settings ${selectedLanguage}`}
              state={{ active: [active, setActive] }}
              tipText={translate("dashboard_nav.settings-confirm-phone")}
            />
          );
        }
      }
    }
  }
  return (
    <nav id="dashboard-nav">
      <ul>
        <NavLink exact activeClassName="active" to={`/profile/`}>
          <li>{translate("dashboard_nav.profile")}</li>
        </NavLink>
        <NavLink exact activeClassName="active" to={`/profile/verify-identity/`}>
          <li>
            {translate("dashboard_nav.identity")}
            {tipsAtIdentity}
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
