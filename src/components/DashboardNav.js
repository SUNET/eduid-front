import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, withRouter } from "react-router-dom";
import NotificationTip from "../login/components/NotificationTip/NotificationTip";
import i18n from "../login/translation/InjectIntl_HOC_factory";

function DashboardNav(props) {
  const [active, setActive] = useState(false);
  const nins = useSelector(state => state.nins.nins);
  const phones =  useSelector(state => state.phones.phones);
  // depending on languages show different styles
  const selectedLanguage = props.intl.locale;
  
  let tipsAtIdentity = "";
  // if user doesnt added id number, rendering text on IDENTITY tab, only posible to verify with a freja eId
  if(!nins.length){
    tipsAtIdentity = <NotificationTip textLength={"short"} tipText={props.translate("dashboard_nav.identity-verify-freja")}/>;
  }
  // else if user added id number and Swedish phone number, rendering text on IDENTITY tab, user can verify by post, phone or freja eId
  else if(nins.length){
    tipsAtIdentity = <NotificationTip tipText={props.translate("dashboard_nav.identity-verify-post-freja")}/>;
    if(phones.length){
      if(phones[0].verified && phones[0].number.includes("+46")){
        tipsAtIdentity = <NotificationTip tipText={props.translate("dashboard_nav.identity-verify-post-phone-freja")}/>;
      }
    }
  } else null;

  let tipsAtSettings = "";
  // if id number and phone number are added, but phone number is not confirmed, rendering text on SETTINGS tab "Confirm your number..."
  if(nins.length){
    if(phones.length){
      if(!phones[0].verified)
        tipsAtSettings = 
          <NotificationTip 
            position={`settings ${selectedLanguage}`} 
            state={{active: [active, setActive]}}  
            tipText={props.translate("dashboard_nav.settings-confirm-phone")}
          />;
    }
  } else null;

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
