import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, withRouter } from "react-router-dom";
import NotificationTip from "../login/components/NotificationTip/NotificationTip";
import i18n from "../login/translation/InjectIntl_HOC_factory";

function DashboardNav(props) {
  const [active, setActive] = useState(false);
  const nins = useSelector(state => state.nins.nins);
  const phones = useSelector(state => state.phones.phones);
  const verifiedNin = nins.filter(nin => nin.verified);
  const verifiedSweNumber = phones.filter(phone => phone.verified && phone.number.includes("+46"));
  const unverifiedNumber = phones.filter(phone => !phone.verified);
  // depending on languages show different styles
  const selectedLanguage = props.intl.locale;
  
  let tipsAtIdentity = "";
  let tipsAtSettings = "";
  // if user does not added id number, rendering text on IDENTITY tab, only posible to verify with a freja eId
  if(!nins.length){
    tipsAtIdentity = <NotificationTip textLength={"short"} tipText={props.translate("dashboard_nav.identity-verify-freja")}/>;
  }
  // else if user added id number, unverified id number, rendering text on IDENTITY tab, possible to verify by post and with a freja eId 
  else if(nins.length && !verifiedNin.length){
    tipsAtIdentity = <NotificationTip tipText={props.translate("dashboard_nav.identity-verify-post-freja")}/>;
    if(phones.length){
      if(verifiedSweNumber.length){
        //if phones array is not empty and verified Swedish phone number, rendering text on IDENTITY tab, user can verify by post, phone or freja eId
        tipsAtIdentity = <NotificationTip tipText={props.translate("dashboard_nav.identity-verify-post-phone-freja")}/>;
      } else if(unverifiedNumber.length){
        // if phone number is not confirmed, rendering text on SETTINGS tab "Confirm your number..."
        tipsAtSettings = 
          <NotificationTip 
            position={`settings ${selectedLanguage}`} 
            state={{active: [active, setActive]}}  
            tipText={props.translate("dashboard_nav.settings-confirm-phone")}
          />;
      }
    }
  } 

  return (
    <nav id="dashboard-nav">
      <ul>
        <NavLink exact activeClassName="active" to={`/profile/`}>
          <li>{props.translate("dashboard_nav.profile")}</li>
        </NavLink>
        <NavLink
          exact
          activeClassName="active"
          to={`/profile/verify-identity/`}
        >
          <li>
            {props.translate("dashboard_nav.identity")}
            {tipsAtIdentity}
          </li>
        </NavLink>
        <NavLink 
          className={tipsAtSettings && active ?  `nav-settings ${selectedLanguage}`: null} 
          activeClassName="active" to={`/profile/settings/`}
        >
          <li>
            {props.translate("dashboard_nav.settings")}
            {tipsAtSettings}
          </li>
        </NavLink>
        <NavLink
          className={tipsAtSettings && active ?  `nav-advanced-settings ${selectedLanguage}`: null} 
          activeClassName="active"
          to={`/profile/settings/advanced-settings`}
        >
          <li>{props.translate("dashboard_nav.advanced-settings")}</li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default i18n(withRouter(DashboardNav));
